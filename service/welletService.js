import config from '../config';
import * as encryption from '../utils/encryption';

/**
 * 创建钱包
 * @param {昵称} nickName 
 * @param {密码} passWord 
 */
export function createWallet(nickName, passWord, callBack){
    let request_url = config.wallet_base + config.wellet_create;

    let params = {
        'cj_nickname_12': nickName,
        'cj_password_12': encryption.mysendJIAmi(passWord),
    }

    config.request(request_url, 'POST', params, (data)=>{
        callBack(data);
    }, (e)=>{
        callBack(e);
    })
}

/**
 * 校验昵称和密码  昵称密码不能少于6位
 * @param {昵称} nickName 
 * @param {密码} passWord 
 */
export function checkNickNameAndPassWord(nickName, passWord){
    if(nickName && passWord){
        if(nickName.length >= 3 && passWord.length >= 6){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}
/**
 * 获取hour钱包余额
 * @param {*} wallet 
 * @param {*} callBack 
 */
export function getHourRemainingSum(wallet, callBack){
    let request_url_eth = config.wallet_base + config.wallet_hor_remaining_sum;
    let params = {
        'ye_hor_addr': wallet.address,
        'ye_hor_contract_addr':'0xd9dAC7b72472376b60b6aee9cfa2498ccCdCB2A7'
    }
    config.request(request_url_eth, 'POST', params, (data)=>{callBack(data)}, (e)=>{callBack(null)});

}
/**
 * 获取eth钱包余额
 * @param {*} wallet 
 * @param {*} callBack 
 */
export function getEthRemainingSum(wallet, callBack){
    let request_url_eth = config.wallet_base + config.wallet_eth_remaining_sum;
    let params = {
        'ye_eth_addr': wallet.address
    }
    config.request(request_url_eth, 'POST', params, (data)=>{callBack(data)}, (e)=>{callBack(null)});
}

/**
 * 获取eth 价格
 * @param {*} flag 
 * @param {*} callBack 
 */
export function getRMBValue(flag, callBack){
    let request_url = config.wallet_base + config.wallet_eth_rmb;
    let params = {
        'k_market_gd_name':flag 
    }
    config.request(request_url, 'POST', params, (data)=>{callBack(data)}, (e)=>{callBack(null)});
}

export function getHorValue(callback){
    let request_url = config.wallet_base + config.wallet_hor_rmb;
    let params = {
        'k_market_gd_name_hor':'hor_eth' 
    }
    config.request(request_url, 'POST', params, (data)=>{callback(data)}, (e)=>{callback(null)});

}
/**
 * 导入钱包 助记词
 */
export function importMemorizingWords(params, callBack){
    let request_url = config.wallet_base + config.wallet_import_memorizingWords;
    let param = {
        dr_12_words: encryption.mysendJIAmi(params.zjc),
        dr_password: encryption.mysendJIAmi(params.pass),
        dr_nickname: params.name,
        dr_m_way: params.key
    }
    config.request(request_url, 'POST', param, (data)=>{callBack(data)}, (e)=>{callBack(null)});
}
/**
 * 导入KeyStore钱包
 * @param {*} params 
 * @param {*} callBack 
 */
export function importOfficialPurse(params, callBack){
    let request_url = config.wallet_base + config.wallet_import_officialPurse;
    let param = {
        dr_ks: encryption.mysendJIAmi(params.keyStore),
        dr_ks_password: encryption.mysendJIAmi(params.pass),
        dr_ks_nickname: params.name
    }
    config.request(request_url, 'POST', param, (data)=>{callBack(data)}, (e)=>{callBack(null)});
}

/**
 * 导入PrivateKey钱包
 * @param {*} params 
 * @param {*} callBack 
 */
export function importPrivateKey(params, callBack){
    let request_url = config.wallet_base + config.wallet_import_privateKey;
    let param = {
        dr_key: encryption.mysendJIAmi(params.privateKey),
        dr_key_password: encryption.mysendJIAmi(params.pass),
        dr_key_nickname: params.name
    }
    config.request(request_url, 'POST', param, (data)=>{callBack(data)}, (e)=>{callBack(null)});
}

/**
 * 更新密码
 * @param {} wallet 
 * @param {*} callBack 
 */
export function updatePassWord(wallet, callBack){
    let request_url = config.wallet_base + config.wallet_update_pass;
    let params = {
        xg_key: wallet.privateKey,
        xg_password_old: encryption.mysendJIAmi(wallet.old),
        xg_password_new: encryption.mysendJIAmi(wallet.pass)
    }
    config.request(request_url, 'POST', params, (data)=>{callBack(data)}, (e)=>{callBack(null)});
}

/**
 * exportPrivateKey
 * @param {} wallet 
 * @param {*} callBack 
 */
export function exportPrivateKey(wallet, callBack){
    let request_url = config.wallet_base + config.wallet_export_privateKey;
    

    let d = encryption.mysendJIAmi(wallet.password)


    let params = {
        'jm_target': wallet.private_key,
        'jm_password': d,
    }

    // console.log("密码：", wallet.password);
    // console.log("密码加密后：", d);
    // console.log("解密后：", encryption.mysendJIEmi(d));
    // console.log("发送参数", params);

    config.request(request_url, 'POST', params, (data)=>{callBack(data)}, (e)=>{callBack(null)});
}

/**
 * exportKeyStore
 * @param {} wallet 
 * @param {*} callBack 
 */
export function exportKeyStore(wallet, callBack){
    let request_url = config.wallet_base + config.wallet_export_keyStore;

    let params = {
        dc_key: wallet.private_key,
        dc_password: encryption.mysendJIAmi(wallet.password),
    }
    config.request(request_url, 'POST', params, (data)=>{callBack(data)}, (e)=>{callBack(null)});
}
/**
 * 获取交易记录
 * @param {*} wallet 
 * @param {*} callBack 
 */
export function ethTransactionRecord(wallet, callBack){
    let request_url = config.wallet_base + config.wallet_eth_transaction_record;
    let params = {
        jy_list_eth_addr: wallet.address,   
    }
    config.request(request_url, 'POST', params, (data)=>{callBack(data)}, (e)=>{callBack(null)}); 
}

/**
 * 获取交易记录
 * @param {*} wallet 
 * @param {*} callBack 
 */
export function horTransactionRecord(wallet, callBack){
    let request_url = config.wallet_base + config.wallet_hour_transaction_record;
    let params = {
        jy_list_hor_addr: wallet.address,
        jy_list_hor_contract_addr:'0xd9dAC7b72472376b60b6aee9cfa2498ccCdCB2A7'
    }
    config.request(request_url, 'POST', params, (data)=>{callBack(data)}, (e)=>{callBack(null)}); 
}

/**
 * 发送交易请求Eth
 * @param {当前钱包} wallet
 * @param {接收信息} to
 * @param {回调} callBack 
 */
export function transferAccountsEth(wallet, to, callBack){

    // console.log('发送地址:', wallet.address);
    // console.log('接收地址:', to.toAddress);
    // console.log('接收地址加密后:', encryption.mysendJIAmi(to.toAddress));
    // console.log('发送金额:', to.money);
    // console.log('发送金额加密后:', encryption.mysendJIAmi(to.money));
    // console.log('发送私钥:', wallet.private_key);
    // console.log('发送GAS:', to.aotuGas);
    // console.log('发送GAS加密后:', encryption.mysendJIAmi(to.formPassWord));
    // console.log('发送备注:', to.marker);
    // console.log('发送密码:', to.formPassWord);
    // console.log('发送密码加密后:', encryption.mysendJIAmi(to.formPassWord));


    let request_url = config.wallet_base + config.wallet_transfer_Accounts_eth;
    let params = {
        send_eth_from: wallet.address,
        send_eth_to: encryption.mysendJIAmi(to.toAddress),
        send_eth_amount: encryption.mysendJIAmi(to.money),
        send_eth_key: wallet.private_key,
        send_eth_gas: encryption.mysendJIAmi(to.aotuGas),
        send_eth_text: to.marker,
        send_eth_password: encryption.mysendJIAmi(to.formPassWord)
    }
    config.request(request_url, 'POST', params, (data)=>{callBack(data)}, (e)=>{callBack(null)}); 
}


/**
 * 发送交易请求Hour
 * @param {*} wallet 
 * @param {*} callBack 
 */
export function transferAccountsHour(wallet, to,  callBack){
    let request_url = config.wallet_base + config.wallet_transfer_Accounts_hour;
    let params = {
        send_hor_from: wallet.address,
        send_hor_to:encryption.mysendJIAmi(to.toAddress),
        send_hor_amount:encryption.mysendJIAmi(to.money),
        send_hor_key: wallet.private_key,
        send_hor_gas: encryption.mysendJIAmi(to.aotuGas),   
        send_hor_contract_addr:encryption.mysendJIAmi('0xd9dAC7b72472376b60b6aee9cfa2498ccCdCB2A7'),
        send_hor_password: encryption.mysendJIAmi(to.formPassWord),
        send_hor_abi: '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"CPCEPrivateDeposit","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"CPCEFundDeposit","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"CPCEFund","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"CPCEPrivate","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"factorial","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"CPCEIco","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"CPCEIcoDeposit","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]',
        send_hor_text: to.marker,
    }
    config.request(request_url, 'POST', params, (data)=>{callBack(data)}, (e)=>{callBack(null)}); 
 
}
