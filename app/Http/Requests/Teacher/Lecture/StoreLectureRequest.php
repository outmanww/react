<?php

namespace App\Http\Requests\Teacher\Lecture;

use App\Http\Requests\Request;

/**
 * Class StoreLectureRequest
 * @package App\Http\Requests\Teacher\Lecture
 */
class StoreLectureRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'department'    => 'required|integer',
            'grade'         => 'required|string',
            'title'         => 'required|string|max:20',
            'code'          => 'string',
            'year_semester' => 'required|string',
            'weekday'       => 'required|integer',
            'time_slot'     => 'required|integer',
            'place'         => 'string|max:20',
            'length'        => 'integer',
            'description'   => 'string|max:120',
        ];
    }
}
