<?php

namespace App\Helpers;

use Illuminate\Support\Facades\DB;

class CariNomor
{
    public static function getCariNomor($model, $column)
    {
        $ids = $model::pluck($column)->toArray();
        for ($i = 1;; $i++) {
            if (!in_array($i, $ids)) {
                return $i;
            }
        }
    }
}
