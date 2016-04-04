<?php

namespace App\Models\Lecture;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\ModelNotFoundException;
// Models
use App\Models\Student\Reaction;

class Room extends Model
{
	use SoftDeletes;

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
		/*
		$results['total'] = Reaction::where('affiliation_id', $affiliation_id)
			->where('room_id', $this->id)
			->where('action_id', config('controller.action.basic'))
			->groupBy('student_id')
			->havingRow('COUNT(CASE type_id WHEN '.config('controller.b_type.room_in').' THEN 1 ELSE NULL END) > COUNT(CASE type_id WHEN '.config('controller.b_type.room_out.'' THEN 1 ELSE NULL END)')
			->get()
			->count();

		$results['react'] = Reaction::where('affiliation_id', $affiliation_id)
			->where('room_id', $this->id)
	        ->whereIn('action_id', [config('controller.action.reaction_anonymous'),config('controller.action.reaction_realname')])
            ->where('created_at', '>', Carbon::now()->subMinutes($interval))
			->where('type_id', $type_id)
			->groupBy('student_id')
			->havingRow('COUNT(CASE type_id WHEN '.config('controller.b_type.room_in').' THEN 1 ELSE NULL END) > COUNT(CASE type_id WHEN '.config('controller.b_type.room_out.'' THEN 1 ELSE NULL END)')
			->get()
			->count();
*/
		return $results;
	}
	public function statusLine()
	{
		
	}
}
