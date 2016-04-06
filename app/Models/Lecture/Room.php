<?php

namespace App\Models\Lecture;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\ModelNotFoundException;
// Models
use App\Models\Student\Reaction;
// Carbon
use Carbon\Carbon;

class Room extends Model
{
	use SoftDeletes;

	protected $connection = 'connection-name';

    /**
     * 複数代入の許可
     */
    protected $fillable = ['lecture_id', 'teacher_id', 'key', 'voice_record', 'length'];

    /**
     * @var array
     */
    protected $dates = ['created_at', 'closed_at', 'deleted_at'];

	public function teacher()
	{
		return $this->belongsTo('App\Models\Access\User\User', 'teacher_id', 'id');
	}

	public function lecture()
	{
		return $this->belongsTo('App\Models\Lecture\Lecture');
	}

	public function statusPie($affiliation_id, $interval, $type_id)
	{
		$results = array(
            'total' => 0,
            'react' => 0,
            );
		
		$results['total'] = Reaction::where('affiliation_id', $affiliation_id)
			->where('room_id', $this->id)
			->where('action_id', config('controller.action.basic'))
			->groupBy('student_id')
			->havingRaw('COUNT(CASE type_id WHEN '.config('controller.b_type.room_in').' THEN 1 ELSE NULL END) > COUNT(CASE type_id WHEN '.config('controller.b_type.room_out').' THEN 1 ELSE NULL END)')
			->get()
			->count();

		$results['react'] = Reaction::where('affiliation_id', $affiliation_id)
			->where('room_id', $this->id)
	        ->whereIn('action_id', [config('controller.action.reaction_anonymous'),config('controller.action.reaction_realname')])
            ->where('created_at', '>', Carbon::now()->subMinutes($interval))
			->where('type_id', $type_id)
			->groupBy('student_id')
			->havingRaw('COUNT(CASE type_id WHEN '.config('controller.b_type.room_in').' THEN 1 ELSE NULL END) > COUNT(CASE type_id WHEN '.config('controller.b_type.room_out').' THEN 1 ELSE NULL END)')
			->get()
			->count();

		return $results;
	}
	public function statusLine($affiliation_id, $interval, $type_id)
	{

		// room create time and close time
		$create_time = $this->created_at;
		if(!$this->closed_at)
			$close_time = Carbon::now();
		else
			$close_time = $this->closed_at;

		// room length
		$room_length = $close_time->diffInMinutes($create_time);
		$num_slot = ceil($room_length/$interval);

		// prepare array
		$num_student_array = array();
		for($i=0; $i<$num_slot; $i++)
			array_push($num_student_array, 0);
		return $num_student_array;

		$room_events = Reaction::allRoomEvent($affiliation_id, $this->id)
								->select('created_at','type_id')
								->get();
		
        foreach($room_events as $room_event)
        {
        	if($room_event['type_id'] == config('controller.b_type.room_in'))
        	{
        		$room_events['created_at'];
        	}
	        else
	        {

	        }
        }


		
		$results['total'] = Reaction::where('affiliation_id', $affiliation_id)
			->where('room_id', $this->id)
			->where('action_id', config('controller.action.basic'))
			->groupBy('student_id')
			->havingRaw('COUNT(CASE type_id WHEN '.config('controller.b_type.room_in').' THEN 1 ELSE NULL END) > COUNT(CASE type_id WHEN '.config('controller.b_type.room_out').' THEN 1 ELSE NULL END)')
			->get()
			->count();

		$results['react'] = Reaction::where('affiliation_id', $affiliation_id)
			->where('room_id', $this->id)
	        ->whereIn('action_id', [config('controller.action.reaction_anonymous'),config('controller.action.reaction_realname')])
            ->where('created_at', '>', Carbon::now()->subMinutes($interval))
			->where('type_id', $type_id)
			->groupBy('student_id')
			->havingRaw('COUNT(CASE type_id WHEN '.config('controller.b_type.room_in').' THEN 1 ELSE NULL END) > COUNT(CASE type_id WHEN '.config('controller.b_type.room_out').' THEN 1 ELSE NULL END)')
			->get()
			->count();

		return $results;
	}
}
