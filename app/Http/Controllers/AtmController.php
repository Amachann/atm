<?php
namespace App\Http\Controllers;

use App\BankAccount;
use Illuminate\Http\Request;

class AtmController extends Controller
{
    public function createToken()
    {
        return csrf_field();
        //hct5VoHBrfx8ALX3iXmTRh47ipvcNF90D6WUt3MS
    }

    public function accountOpen()
    {
        //Bankaccountのインスタンスを生成
        $account = new BankAccount();
        //初期値を設定してinsertする
        $account->deposit_balance = 0;
        $account->save();

        return response()->json([
            "id" => $account->id,
            "deposit_balance" => $account->deposit_balance
        ]);
    }

    //残高照会
    public function balanceReference($accountId)
    {
        //引数から対象の口座を取得
        $account = BankAccount::find($accountId);

        return response()->json([
            "deposit_balance" => $account->deposit_balance
        ]);
    }

    //預け入れ
    public function depositMoney($accountId, Request $request)
    {
        //引数から対象の口座を取得
        $account = BankAccount::find($accountId);
        //口座の残高に対してリクエストされた金額を加算し保存
        $account->deposit_balance += $request->amount;
        $account->save();

        return response()->json([
            "deposit_balance" => $account->deposit_balance
        ]);
    }

    //引き出し
    public function withdrawal($accountId, Request $request)
    {
        //引数から対象の口座を取得
        $account = BankAccount::find($accountId);
        $amount = $request->amount;

        //口座の残高がリクエストされた金額よりも多いかを確認
        if ($account->deposit_balance >= $amount) {
            //口座の残高に対してリクエsとされた金額を減算し保存
            $account->deposit_balance -= $amount;
            $account->save();
        }

        return response()->json([
            "deposit_balance" => $account->deposit_balance
        ]);
    }
}