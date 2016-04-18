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
use App\Models\Point\Point;
// Carbon
use Carbon\Carbon;

class Room extends Model
{
	use SoftDeletes, CustomRelations;

	protected $connection;

	private $affiliation_id;

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
        $this->affiliation_id = null;
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

	// get data for pie chart
	private function statusPie($type_id, $interval = 5)
	{
		// get affiliation ID
		if(is_null($this->affiliation_id))
			$this->affiliation_id = Affiliation::where('db_name', $this->connection)->value('id');

		// prepare the result array
		$results = array(
            'attendance' => 0,
            'reaction' => 0,
            );
		
		// get last room events for each student ID
		$room_events = Reaction::allRoomEvent($this->affiliation_id, $this->id)
									->select('student_id', 'type_id', 'created_at')
									->groupBy('student_id')
									->havingRaw('created_at = MAX(created_at)')
									->get();

		// count the current attendance
		$attendance_array = array();
		foreach($room_events as $room_event)
        {
        	if(config('controller.b_type.room_in') == $room_event['type_id'])
        		array_push($attendance_array, $room_event['student_id']);
        }
        $results['attendance'] = count($attendance_array);

        // get the reaction events in $interval minutes
        $reaction_events = Reaction::inMinutes($this->affiliation_id, $this->id, $type_id, $interval)
        								->select('student_id')
        								->groupBy('student_id')
        								->get();
		foreach($reaction_events as $reaction_event)
        {
        	// if the student is still in attendance, count to the number
        	if(in_array($reaction_event['student_id'], $attendance_array))
        		$results['reaction']++;
        }

		return $results;
	}

	private function statusPieAll($interval = 5)
	{
		// get affiliation ID
		if(is_null($this->affiliation_id))
			$this->affiliation_id = Affiliation::where('db_name', $this->connection)->value('id');

		// prepare the result array
		$results = array(
            'attendance' => 0,
            'confused' => 0,
            'interesting' => 0,
            'boring' => 0,
            );
		
		// get last room events for each student ID
		$room_events = Reaction::allRoomEvent($this->affiliation_id, $this->id)
									->select('student_id', 'type_id', 'created_at')
									->groupBy('student_id')
									->havingRaw('created_at = MAX(created_at)')
									->get();

		// count the current attendance
		$attendance_array = array();
		foreach($room_events as $room_event)
        {
        	if(config('controller.b_type.room_in') == $room_event['type_id'])
        		array_push($attendance_array, $room_event['student_id']);
        }
        $results['attendance'] = count($attendance_array);

        // get the reaction events in $interval minutes
        $reaction_events = Reaction::inMinutes($this->affiliation_id, $this->id, config('controller.r_type.confused'), $interval)
        								->select('student_id')
        								->groupBy('student_id')
        								->get();
		foreach($reaction_events as $reaction_event)
        {
        	if(in_array($reaction_event['student_id'], $attendance_array))
        		$results['confused']++;
        }

        $reaction_events = Reaction::inMinutes($this->affiliation_id, $this->id, config('controller.r_type.interesting'), $interval)
        								->select('student_id')
        								->groupBy('student_id')
        								->get();
		foreach($reaction_events as $reaction_event)
        {
        	if(in_array($reaction_event['student_id'], $attendance_array))
        		$results['interesting']++;
        }

        $reaction_events = Reaction::inMinutes($this->affiliation_id, $this->id, config('controller.r_type.boring'), $interval)
        								->select('student_id')
        								->groupBy('student_id')
        								->get();
		foreach($reaction_events as $reaction_event)
        {
        	if(in_array($reaction_event['student_id'], $attendance_array))
        		$results['boring']++;
        }

		return $results;
	}

	// get attendance data
	private function historyAttendance($interval = 10)
	{
		// get affiliation ID
		if(is_null($this->affiliation_id))
			$this->affiliation_id = Affiliation::where('db_name', $this->connection)->value('id');

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

		$room_events = Reaction::allRoomEvent($this->affiliation_id, $this->id)
								->select('created_at','type_id')
								->get();

		// calculate the attendance for each slot
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

	private function historyReaction($type_id, $interval = 10)
	{
		// get affiliation ID
		if(is_null($this->affiliation_id))
			$this->affiliation_id = Affiliation::where('db_name', $this->connection)->value('id');

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

		// get all reaction event by type
		$reaction_events = Reaction::allReactionEventByType($this->affiliation_id, $this->id, $type_id)
								->select('created_at','student_id')
								->orderBy('student_id')
								->orderBy('created_at')
								->get();

		// calculate the weighted reaction for each event
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
	   		if($slotIndex >= $num_slot)
	   			continue;
    		$weight = ($event_time-$lastTime) / config('controller.interval_reaction');
			if($weight>=1)
				$num_array[$slotIndex]++;
			else
				$num_array[$slotIndex]+=$weight;	
			$lastTime = $event_time;
        }

		return $num_array;
	}

	private function historyAllTypeReaction($interval = 10)
	{
		// get affiliation ID
		if(is_null($this->affiliation_id))
			$this->affiliation_id = Affiliation::where('db_name', $this->connection)->value('id');
		
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

		// get all reaction event
		$reaction_events = Reaction::allReactionEvent($this->affiliation_id, $this->id)
								->select('created_at','student_id','type_id')
								->orderBy('student_id')
								->orderBy('created_at')
								->get();

		// calculate the weighted reaction for each event
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
       		if($slotIndex >= $num_slot)
       			continue;
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

		return ['attendance'=>$this->historyAttendance($interval),
				'confused'=>$num_confused_array,
				'interesting'=>$num_interesting_array,
				'boring'=>$num_boring_array];
	}

	// data for all chart data real time
	public function getChartData($pieInterval = 5, $lineInterval = 10)
	{
		$results = array();

		$results['pie']=$this->statusPieAll($pieInterval);
		$results['line']=$this->historyAllTypeReaction($lineInterval);

		return $results;
	}

	// generate key for new room
	public function genKey()
	{
 		// get affiliation ID
		if(is_null($this->affiliation_id))
			$this->affiliation_id = Affiliation::where('db_name', $this->connection)->value('id');

		for($i=0;$i<config('controller.max_rand_key_gen');$i++)
		{
			$keyIdx = random_int( 0 , 999 );
			$key = $this->affiliation_id*1000+$keyIdx;
			if ($this->where('key', $key)->where('closed_at', null)->get()->count()==0) {
				$this->key = $key;
				return true;
			}
		}
		
		$items = $this->where('closed_at', null)->select('key')->get();
		$used_keys = array();
		foreach ($items as $item)
			array_push($used_keys, $item->key);
		$keyIdx = random_int( 0 , 999 );
		for($i=0;$i<=1000;$i++)
		{
			$key = $this->affiliation_id*1000+$keyIdx;
			if(!in_array($key, $used_keys))
			{
				$this->key = $key;
				return true;
			}
			$keyIdx = ($keyIdx++)%1000;
		}

		return false;
	}

	// close room operation
	public function closeRoom($history_data_interval = 10)
	{
		// if already closed
		if(null != $this->closed_at)
			return;

		// get time now
        $now = Carbon::now();

		// save close status to avoid room event
        $this->closed_at = $now;
        $this->save();

 		// get affiliation ID
		if(is_null($this->affiliation_id))
			$this->affiliation_id = Affiliation::where('db_name', $this->connection)->value('id');

		// room create time
		$room_create_time = $this->created_at;

		// get last room event for each student
		$room_events = Reaction::allRoomEvent($this->affiliation_id, $this->id)
									->select('id', 'student_id', 'type_id', 'created_at')
									->groupBy('student_id')
									->havingRaw('created_at = MAX(created_at)')
									->get();

		foreach($room_events as $room_event)
        {
        	// if the student has already quit the room, continue with next one
        	if(config('controller.b_type.room_out') == $room_event['type_id'])
        		continue;

        	// add room out event
	        Reaction::insert([
	            'student_id' => $room_event['student_id'],
	            'this->affiliation_id' => $this->affiliation_id,
	            'action_id' => config('controller.action.basic'),
	            'type_id' => config('controller.b_type.room_out'),
	            'room_id' => $this->id,
	            'message' => null,
	            ]);

	        // point calculation
            $last_room_in = Carbon::createFromFormat('Y-m-d H:i:s', $room_event['created_at']);
            $min_diff = $now->diffInMinutes($last_room_in);
            $new_points = Point::calPoints($min_diff);

            if($new_points>0)
            {
                Point::insert([
                    'student_id' => $room_event['student_id'],
                    'this->affiliation_id' => $this->affiliation_id,
                    'room_id' => $this->id,
                    'point_diff' => $new_points
                    ]);
            }
        }

        // add history data
        $reactions = $this->historyAllTypeReaction($history_data_interval);
        $this->history_attendance = implode(",",$reactions['attendance']);
        $this->history_confused = implode(",",$reactions['confused']);
        $this->history_interesting = implode(",",$reactions['interesting']);
        $this->history_boring = implode(",",$reactions['boring']);
        $this->save();
    }
}
