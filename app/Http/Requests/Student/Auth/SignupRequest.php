<?php

namespace App\Http\Requests\Student\Auth;

use App\Http\Requests\Request;

class SignupRequest extends Request
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
            'family_name' => 'required',
            'given_name'  => 'required',
            'email'       => 'required|email|max:255|unique:students'
        ];
    }
}
