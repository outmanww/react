<?php

namespace App\Http\Requests\Teacher\Lecture;

use App\Http\Requests\Request;

/**
 * Class UpdateLectureRequest
 * @package App\Http\Requests\Teacher\Lecture
 */
class UpdateLectureRequest extends Request
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
            'title'  => 'string|max:15',
            'grade' => 'integer',
            'time_slot' => 'integer',
            'length' => 'integer',
            'description' => 'string|max:100',
        ];
    }
}
