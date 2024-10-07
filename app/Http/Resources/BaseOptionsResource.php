<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BaseOptionsResource extends JsonResource
{
    protected $labelField;
    protected $valueField;
    /**
     * Constructor untuk menerima field yang dinamis.
     */
    public function __construct($resource, $labelField, $valueField)
    {
        parent::__construct($resource);
        $this->labelField = $labelField;
        $this->valueField = $valueField;
    }

    /**
     * Mengembalikan array yang berisi label dan value dinamis
     */
    public function toArray($request)
    {
        return [
            'label' => $this->{$this->labelField},
            'value' => $this->{$this->valueField},
        ];
    }
}
