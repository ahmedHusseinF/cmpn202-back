/**
 * Constantservice Service
 *
 */
class Constantservice {
  SCHEMES = 'Schemes';
  MERCHANTS = 'Merchants';
  BANKS = 'Banks';
  backBaseUrl = 'http://localhost:1337';

  WALLET_USER = 'wallet_user';
  SYSTEM_USER = 'system_user';
  CONSUMER = `Consumer`;
  MERCHANT = `Merchant`;


  /**
   * wallet user types
   */
  WALLET_CUSTOMER = 'customer';
  WALLET_MERCHANT = 'merchant';

  GCM_KEY = 'AAAA6UcOE0c:APA91bG-42UjbSl7Q15ASl5M2fhb4o2l31NtPkCgaq1K_Z1_RATrIvvs95z83XxDuW_GXMjx6dy_PKRLTleipMojqX2rE5cCAC_tSaMo_QbBMZpxeNQlotrvC2UaBpqdlT0cQApVhVkJ';

  LEFT_RIGHT: number = 1;
  MAKER_CHECKER: number = 2;
  FREE: number = 3;

  aggregated_account_info = {
    global: {
      credit_daily_count: 0,
      credit_daily_amount: 0,
      credit_monthly_amount: 0,
      credit_monthly_count: 0,
      debit_daily_amount: 0,
      debit_daily_count: 0,
      debit_monthly_amount: 0,
      debit_monthly_count: 0
    },

    p2p: {
      credit_daily_count: 0,
      credit_daily_amount: 0,
      credit_monthly_count: 0,
      credit_monthly_amount: 0,
      debit_daily_count: 0,
      debit_daily_amount: 0,
      debit_monthly_count: 0,
      debit_monthly_amount: 0
    },

    p2m: {
      credit_daily_count: 0,
      credit_daily_amount: 0,
      credit_monthly_count: 0,
      credit_monthly_amount: 0,
      debit_daily_count: 0,
      debit_daily_amount: 0,
      debit_monthly_count: 0,
      debit_monthly_amount: 0
    },

    m2m: {
      credit_daily_count: 0,
      credit_daily_amount: 0,
      credit_monthly_count: 0,
      credit_monthly_amount: 0,
      debit_daily_count: 0,
      debit_daily_amount: 0,
      debit_monthly_count: 0,
      debit_monthly_amount: 0
    },

    cashIn: {
      credit_daily_count: 0,
      credit_daily_amount: 0,
      credit_monthly_count: 0,
      credit_monthly_amount: 0,
      debit_daily_count: 0,
      debit_daily_amount: 0,
      debit_monthly_count: 0,
      debit_monthly_amount: 0
    },

    cashOut: {
      credit_daily_count: 0,
      credit_daily_amount: 0,
      credit_monthly_count: 0,
      credit_monthly_amount: 0,
      debit_daily_count: 0,
      debit_daily_amount: 0,
      debit_monthly_count: 0,
      debit_monthly_amount: 0
    },

    lfc: {
      credit_daily_count: 0,
      credit_daily_amount: 0,
      credit_monthly_count: 0,
      credit_monthly_amount: 0,
      debit_daily_count: 0,
      debit_daily_amount: 0,
      debit_monthly_count: 0,
      debit_monthly_amount: 0
    },

    deposit: {
      credit_daily_count: 0,
      credit_daily_amount: 0,
      credit_monthly_count: 0,
      credit_monthly_amount: 0,
      debit_daily_count: 0,
      debit_daily_amount: 0,
      debit_monthly_count: 0,
      debit_monthly_amount: 0
    }
  };
}

module.exports = new Constantservice();
