<?php

namespace App\Http\Requests\Teacher\Lecture;

use App\Http\Requests\Request;

/**
 * Class StoreLectureRequest
 * @package App\Http\Requests\Teacher\Lecture
 */
class JoinLectureRequest extends Request
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
            'id' => 'required|integer'
        ];
    }
}
