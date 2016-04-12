<?php

namespace App\Models\Lecture;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\ModelNotFoundException;
// Models
use App\Models\Student\Reaction;
use App\Models\Student\Affiliation;
use App\Models\CustomRelations;
use App\Models\Access\User\User;
use App\Models\Lecture\Lecture;
// Carbon
use Carbon\Carbon;

class Room extends Model
{
	use SoftDeletes, CustomRelations;

	protected $connection;

    /**
     * 複数代入の許可
     */
    protected $fillable = ['lecture_id', 'teacher_id', 'key', 'voice_record', 'length'];

    /**
     * @var array
     */
    protected $dates = ['created_at', 'closed_at', 'deleted_at'];

    /**
     * set connection from url parameters
     */
    public function __construct()
    {
        $school = \Request::route('school');
        if (isset($school)) {
            $this->setConnection($school);
        }
    }

	public function teacher()
	{
		$teacher = new User;
        $teacher = $teacher->setConnection($this->connection);
		return $this->CustomBelongsTo($teacher, 'teacher_id', 'id');
	}

	public function lecture()
	{
		$lecture = new Lecture;
        $lecture = $lecture->setConnection($this->connection);
		return $this->CustomBelongsTo($lecture);
	}

	public function statusPie($interval, $type_id)
	{
		$affiliation_id = Affiliation::where('db_name', $this->connection)->value('id');

		$results = array(
            'total' => 0,
            'reaction' => 0,
            );
		
		$room_events = Reaction::allRoomEvent($affiliation_id, $this->id)
									->select('student_id', 'type_id', 'created_at')
									->groupBy('student_id')
									->havingRaw('created_at = MAX(created_at)')
									->get();

		$attendance_array = array();
		foreach($room_events as $room_event)
        {
        	if(config('controller.b_type.room_in') == $room_event['type_id'])
        		array_push($attendance_array, $room_event['student_id']);
        }
        $results['total'] = count($attendance_array);

        $reaction_events = Reaction::inMinutes($affiliation_id, $this->id, $type_id, $interval)
        								->select('student_id')
        								->groupBy('student_id')
        								->get();
		foreach($reaction_events as $reaction_event)
        {
        	if(in_array($reaction_event['student_id'], $attendance_array))
        		$results['reaction']++;
        }
/*
		$results['total'] = Reaction::where('affiliation_id', $affiliation_id)
			->where('room_id', $this->id)
			->where('action_id', config('controller.action.basic'))
			->groupBy('student_id')
			->havingRaw('COUNT(CASE type_id WHEN '.config('controller.b_type.room_in').' THEN 1 ELSE NULL END) > COUNT(CASE type_id WHEN '.config('controller.b_type.room_out').' THEN 1 ELSE NULL END)')
			->get()
			->count();

		$results['reaction'] = Reaction::where('affiliation_id', $affiliation_id)
			->where('room_id', $this->id)
	        ->whereIn('action_id', [config('controller.action.reaction_anonymous'),config('controller.action.reaction_realname')])
            ->where('created_at', '>', Carbon::now()->subMinutes($interval))
			->where('type_id', $type_id)
			->groupBy('student_id')
			->havingRaw('COUNT(CASE type_id WHEN '.config('controller.b_type.room_in').' THEN 1 ELSE NULL END) > COUNT(CASE type_id WHEN '.config('controller.b_type.room_out').' THEN 1 ELSE NULL END)')
			->get()
			->count();
*/
		return $results;
	}

	public function historyAttendance($interval)
	{
		$affiliation_id = Affiliation::where('db_name', $this->connection)->value('id');

		// room create time and close time
		$room_create_time = $this->created_at;
		if(!$this->closed_at)
			$room_close_time = Carbon::now();
		else
			$room_close_time = $this->closed_at;

		// room length
		$room_length = $room_close_time->diffInMinutes($room_create_time);
		$num_slot = ceil($room_length/$interval);

		// prepare array
		$num_student_array = array();
		for($i=0; $i<$num_slot; $i++)
			array_push($num_student_array, 0);

		$room_events = Reaction::allRoomEvent($affiliation_id, $this->id)
								->select('created_at','type_id')
								->get();

        foreach($room_events as $room_event)
        {
        	if($room_event['type_id'] == config('controller.b_type.room_in'))
        	{
        		$time_room_in = Carbon::createFromFormat('Y-m-d H:i:s', $room_event['created_at']);
        		$time_room_in = $time_room_in->diffInMinutes($room_create_time);
				for($i=$num_slot-1; $i>=0; $i--)
				{
					if($time_room_in<$i*$interval)
						$num_student_array[$i]++;
					elseif($time_room_in>=$i*$interval && $time_room_in<$i*$interval+$interval)
						$num_student_array[$i] += $i+1-$time_room_in/$interval;
					else
						break;
				}
        	}
	        else
	        {
        		$time_room_out = Carbon::createFromFormat('Y-m-d H:i:s', $room_event['created_at']);
        		$time_room_out = $time_room_out->diffInMinutes($room_create_time);
				for($i=$num_slot-1; $i>=0; $i--)
				{
					if($time_room_out<$i*$interval)
						$num_student_array[$i]--;
					elseif($time_room_out>=$i*$interval && $time_room_out<$i*$interval+$interval)
						$num_student_array[$i] -= $i+1-$time_room_out/$interval;
					else
						break;
				}
	        }
        }

		return $num_student_array;
	}

	public function historyReaction($interval, $type_id)
	{
		$affiliation_id = Affiliation::where('db_name', $this->connection)->value('id');

		// room create time and close time
		$room_create_time = $this->created_at;
		if(!$this->closed_at)
			$room_close_time = Carbon::now();
		else
			$room_close_time = $this->closed_at;

		// room length
		$room_length = $room_close_time->diffInMinutes($room_create_time);
		$num_slot = ceil($room_length/$interval);

		// prepare array
		$num_array = array();
		for($i=0; $i<$num_slot; $i++)
			array_push($num_array, 0);

		$reaction_events = Reaction::allReactionEventByType($affiliation_id, $this->id, $type_id)
								->select('created_at','student_id')
								->orderBy('student_id')
								->orderBy('created_at')
								->get();

		$lastStudentID = -1;
        foreach($reaction_events as $reaction_event)
        {
        	if($reaction_event['student_id'] != $lastStudentID)
        	{
				$lastTime = 0-$interval;
        		$lastStudentID = $reaction_event['student_id'];
        	}
    		$event_time = Carbon::createFromFormat('Y-m-d H:i:s', $reaction_event['created_at']);
    		$event_time = $event_time->diffInMinutes($room_create_time);
    		
    		$slotIndex = ceil($event_time/$interval);

    		$weight = ($event_time-$lastTime) / config('controller.interval_reaction');
			if($weight>=1)
				$num_array[$slotIndex]++;
			else
				$num_array[$slotIndex]+=$weight;	
			$lastTime = $event_time;
        }

		return $num_array;
	}

	public function historyAllTypeReaction($interval)
	{
		$affiliation_id = Affiliation::where('db_name', $this->connection)->value('id');
		
		// room create time and close time
		$room_create_time = $this->created_at;
		if(!$this->closed_at)
			$room_close_time = Carbon::now();
		else
			$room_close_time = $this->closed_at;

		// room length
		$room_length = $room_close_time->diffInMinutes($room_create_time);
		$num_slot = ceil($room_length/$interval);

		// prepare array
		$num_confused_array = array();
		$num_interesting_array = array();
		$num_boring_array = array();
		for($i=0; $i<$num_slot; $i++)
		{
			array_push($num_confused_array, 0);
			array_push($num_interesting_array, 0);
			array_push($num_boring_array, 0);
		}

		$reaction_events = Reaction::allReactionEvent($affiliation_id, $this->id)
								->select('created_at','student_id','type_id')
								->orderBy('student_id')
								->orderBy('created_at')
								->get();

		$lastStudentID = -1;
        foreach($reaction_events as $reaction_event)
        {
        	if($reaction_event['student_id'] != $lastStudentID)
        	{
				$lastConTime = 0-$interval;
				$lastIntTime = 0-$interval;
				$lastBorTime = 0-$interval;
        		$lastStudentID = $reaction_event['student_id'];
        	}
    		$event_time = Carbon::createFromFormat('Y-m-d H:i:s', $reaction_event['created_at']);
    		$event_time = $event_time->diffInMinutes($room_create_time);
    		
    		$slotIndex = ceil($event_time/$interval);
        	if($reaction_event['type_id'] == config('controller.r_type.confused'))
        	{
        		$weight = ($event_time-$lastConTime) / config('controller.interval_reaction');
				if($weight>=1)
					$num_confused_array[$slotIndex]++;
				else
					$num_confused_array[$slotIndex]+=$weight;	
				$lastConTime = $event_time;
        	}
	        elseif($reaction_event['type_id'] == config('controller.r_type.interesting'))
	        {
        		$weight = ($event_time-$lastIntTime) / config('controller.interval_reaction');
				if($weight>=1)
					$num_interesting_array[$slotIndex]++;
				else
					$num_interesting_array[$slotIndex]+=$weight;	
				$lastIntTime = $event_time;
	        }
	        elseif($reaction_event['type_id'] == config('controller.r_type.boring'))
	        {
        		$weight = ($event_time-$lastBorTime) / config('controller.interval_reaction');
				if($weight>=1)
					$num_boring_array[$slotIndex]++;
				else
					$num_boring_array[$slotIndex]+=$weight;	
				$lastBorTime = $event_time;
	        }
        }

		return [config('controller.r_type.confused')=>$num_confused_array,
				config('controller.r_type.interesting')=>$num_interesting_array,
				config('controller.r_type.boring')=>$num_boring_array];
	}
}
