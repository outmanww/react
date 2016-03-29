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
            'title'          => 'required|string|max:15',
            'department_id'  => 'required|integer',
            'code'           => 'required|string',
            'grade'          => 'required|integer',
            'time_slot'      => 'required|integer',
            'length'         => 'required|integer',
            'year'           => 'required|integer',
            'semester'       => 'required|integer',
            'description'    => 'required|string|max:100',
        ];
    }
}
