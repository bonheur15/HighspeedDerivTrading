/**
 * Request server status.
 */
export interface ServerStatusRequest {
  /**
   * Must be `1`
   */
  website_status: 1;
  /**
   * [Optional] `1` to stream the server/website status updates.
   */
  subscribe?: 0 | 1;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Server status alongside general settings like call limits, currencies information, supported languages, etc.
 */
export interface ServerStatusResponse {
  website_status?: WebsiteStatus;
  subscription?: SubscriptionInformation;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "website_status";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Server status and other information regarding general settings
 */
export interface WebsiteStatus {
  /**
   * Maximum number of API calls during specified period of time.
   */
  api_call_limits: {
    /**
     * Maximum subscription to proposal calls.
     */
    max_proposal_subscription: {
      /**
       * Describes which calls this limit applies to.
       */
      applies_to: string;
      /**
       * Maximum number of allowed calls.
       */
      max: number;
    };
    /**
     * Maximum number of general requests allowed during specified period of time.
     */
    max_requestes_general: {
      /**
       * Describes which calls this limit applies to.
       */
      applies_to: string;
      /**
       * The maximum of allowed calls per hour.
       */
      hourly: number;
      /**
       * The maximum of allowed calls per minute.
       */
      minutely: number;
    };
    /**
     * Maximum number of outcome requests allowed during specified period of time.
     */
    max_requests_outcome: {
      /**
       * Describes which calls this limit applies to.
       */
      applies_to: string;
      /**
       * The maximum of allowed calls per hour.
       */
      hourly: number;
      /**
       * The maximum of allowed calls per minute.
       */
      minutely: number;
    };
    /**
     * Maximum number of pricing requests allowed during specified period of time.
     */
    max_requests_pricing: {
      /**
       * Describes which calls this limit applies to.
       */
      applies_to: string;
      /**
       * The maximum of allowed calls per hour.
       */
      hourly: number;
      /**
       * The maximum of allowed calls per minute.
       */
      minutely: number;
    };
  };
  /**
   * List of all available broker codes.
   */
  broker_codes?: string[];
  /**
   * Country code of connected IP
   */
  clients_country?: string;
  /**
   * Available currencies and their information
   */
  currencies_config: {
    /**
     * Currency code
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[a-zA-Z0-9]{2,20}$".
     */
    [k: string]: {
      /**
       * Number of fractional digits.
       */
      fractional_digits: number;
      /**
       * Current status for payment deposit for the currency
       */
      is_deposit_suspended: 0 | 1;
      /**
       * Current status for the currency
       */
      is_suspended: 0 | 1;
      /**
       * Current status for payment withdrawal for the currency
       */
      is_withdrawal_suspended: 0 | 1;
      /**
       * Name of the currency.
       */
      name?: string;
      /**
       * List of cashier platforms supported for this currency. It is categorized by cashier and ramp (on-ramp, off-ramp) platforms.
       */
      platform?: {
        /**
         * Supported platforms for the cashier, this is passed to provider attribute of `cashier` call
         */
        cashier: unknown[];
        /**
         * Supported platforms for the ramp (on-ramp, off-ramp)
         */
        ramp: unknown[];
      };
      /**
       * Default stake value for the currency.
       */
      stake_default: number;
      /**
       * Fees and range of allowed amount for transfer between accounts with different types of currencies.
       */
      transfer_between_accounts: {
        /**
         * The fee that applies for transfer between accounts with different types of currencies.
         */
        fees: {
          /**
           * Currency code.
           *
           * This interface was referenced by `undefined`'s JSON-Schema definition
           * via the `patternProperty` "^[a-zA-Z0-9]{2,20}$".
           */
          [k: string]: number;
        };
        /**
         * Range of allowed amount for transfer between accounts.
         */
        limits: {
          /**
           * Maximum allowed amount for transfer between accounts with different types of currencies.
           */
          max?: number;
          /**
           * Minimum allowed amount for transfer between accounts with different types of currencies.
           */
          min: number;
          [k: string]: unknown;
        } | null;
        /**
         * Range of allowed amount for transfer between ctrader accounts.
         */
        limits_ctrader?: {
          [k: string]: unknown;
        };
        /**
         * Range of allowed amount for transfer between dxtrade accounts.
         */
        limits_dxtrade?: {
          [k: string]: unknown;
        };
        /**
         * Range of allowed amount for transfer between mt5 accounts.
         */
        limits_mt5?: {
          [k: string]: unknown;
        };
      };
      /**
       * Type of the currency.
       */
      type: "fiat" | "crypto";
    };
  };
  /**
   * Suspension status of Dxtrade/DerivX API calls
   */
  dxtrade_status?: {
    /**
     * Suspension of Dxtrade/DerivX API calls on all servers.
     */
    all?: number;
    /**
     * Suspension of Dxtrade/DerivX API calls on demo servers.
     */
    demo?: number;
    /**
     * Suspension of Dxtrade/DerivX API calls on real trading servers.
     */
    real?: number;
  };
  /**
   * Text for site status banner, contains problem description. shown only if set by the system.
   */
  message?: string;
  /**
   * Suspension status of MT5 API calls
   */
  mt5_status?: {
    /**
     * Suspension of MT5 API calls on demo servers.
     */
    demo?: unknown[];
    /**
     * Suspension of MT5 API calls on real trading servers.
     */
    real?: unknown[];
  };
  /**
   * Peer-to-peer payment system settings.
   */
  p2p_config?: {
    /**
     * Maximum number of active ads allowed by an advertiser per currency pair and advert type (buy or sell).
     */
    adverts_active_limit: number;
    /**
     * Adverts will be deactivated if no activity occurs within this period, in days.
     */
    adverts_archive_period?: number;
    /**
     * Block trading settings
     */
    block_trade: {
      /**
       * When 1, Block trading is unavailable.
       */
      disabled?: 0 | 1;
      /**
       * Maximum amount of a block trade advert, in USD.
       */
      maximum_advert_amount?: number;
    };
    /**
     * A buyer will be blocked for this duration after exceeding the cancellation limit, in hours.
     */
    cancellation_block_duration: number;
    /**
     * The period within which to count buyer cancellations, in hours.
     */
    cancellation_count_period: number;
    /**
     * A buyer may cancel an order within this period without negative consequences, in minutes after order creation.
     */
    cancellation_grace_period: number;
    /**
     * A buyer will be temporarily barred after marking this number of cancellations within cancellation_period.
     */
    cancellation_limit: number;
    /**
     * When 0, only exchanges in local currency are allowed for P2P advertiser.
     */
    cross_border_ads_enabled: 0 | 1;
    /**
     * When 1, the P2P service is unavailable.
     */
    disabled: 0 | 1;
    /**
     * Indicates the availbility of certain backend features.
     */
    feature_level: number;
    /**
     * Availability of fixed rate adverts.
     */
    fixed_rate_adverts: "disabled" | "enabled" | "list_only";
    /**
     * Date on which fixed rate adverts will be deactivated.
     */
    fixed_rate_adverts_end_date?: string;
    /**
     * Availability of floating rate adverts.
     */
    float_rate_adverts: "disabled" | "enabled" | "list_only";
    /**
     * Maximum rate offset for floating rate adverts.
     */
    float_rate_offset_limit: number;
    /**
     * Available local currencies for p2p_advert_list request.
     */
    local_currencies: {
      /**
       * Local currency name
       */
      display_name: string;
      /**
       * Indicates that there are adverts available for this currency.
       */
      has_adverts: 0 | 1;
      /**
       * Indicates that this is local currency for the current country.
       */
      is_default?: 1;
      /**
       * Local currency symbol
       */
      symbol: string;
    }[];
    /**
     * Maximum amount of an advert, in USD.
     */
    maximum_advert_amount: number;
    /**
     * Maximum amount of an order, in USD.
     */
    maximum_order_amount: number;
    /**
     * Maximum number of orders a user may create per day.
     */
    order_daily_limit: number;
    /**
     * Time allowed for order payment, in minutes after order creation.
     */
    order_payment_period: number;
    /**
     * Local P2P exchange rate which should be used instead of those obtained from the `exchange_rates` call.
     */
    override_exchange_rate?: string;
    /**
     * Indicates if the payment methods feature is enabled.
     */
    payment_methods_enabled: 0 | 1;
    /**
     * Time after successful order completion during which reviews can be created, in hours.
     */
    review_period: number;
    /**
     * List of currencies for which P2P is available
     */
    supported_currencies: string[];
  };
  /**
   * Payments Agents system settings.
   */
  payment_agents?: {
    /**
     * Initial deposit requirement per country.
     */
    initial_deposit_per_country: {
      /**
       * Country code or default setting
       *
       * This interface was referenced by `undefined`'s JSON-Schema definition
       * via the `patternProperty` "^([a-z]{2}|default)$".
       */
      [k: string]: number;
    };
  };
  /**
   * The current status of the website.
   */
  site_status?: "up" | "down" | "updating";
  /**
   * Provides codes for languages supported.
   */
  supported_languages?: string[];
  /**
   * Latest terms and conditions version.
   */
  terms_conditions_version?: string;
}
/**
 * For subscription requests only.
 */
export interface SubscriptionInformation {
  /**
   * A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.
   */
  id: string;
}
/**
 * Request server config.
 */
export interface ServerConfigRequest {
  /**
   * Must be `1`
   */
  website_config: 1;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * All config related settings.
 */
export interface ServerConfigResponse {
  website_config?: WebsiteConfig;
  subscription?: SubscriptionInformation;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "website_config";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Server status and other information regarding general settings
 */
export interface WebsiteConfig {
  /**
   * Available currencies and their information
   */
  currencies_config: {
    /**
     * Currency code
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[a-zA-Z0-9]{2,20}$".
     */
    [k: string]: {
      /**
       * Number of fractional digits.
       */
      fractional_digits: number;
      /**
       * Current status for payment deposit for the currency
       */
      is_deposit_suspended: 0 | 1;
      /**
       * Current status for the currency
       */
      is_suspended: 0 | 1;
      /**
       * Current status for payment withdrawal for the currency
       */
      is_withdrawal_suspended: 0 | 1;
      /**
       * Name of the currency.
       */
      name?: string;
      /**
       * List of cashier platforms supported for this currency. It is categorized by cashier and ramp (on-ramp, off-ramp) platforms.
       */
      platform?: {
        /**
         * Supported platforms for the cashier, this is passed to provider attribute of `cashier` call
         */
        cashier: unknown[];
        /**
         * Supported platforms for the ramp (on-ramp, off-ramp)
         */
        ramp: unknown[];
      };
      /**
       * Default stake value for the currency.
       */
      stake_default: number;
      /**
       * Fees and range of allowed amount for transfer between accounts with different types of currencies.
       */
      transfer_between_accounts: {
        /**
         * The fee that applies for transfer between accounts with different types of currencies.
         */
        fees: {
          /**
           * Currency code.
           *
           * This interface was referenced by `undefined`'s JSON-Schema definition
           * via the `patternProperty` "^[a-zA-Z0-9]{2,20}$".
           */
          [k: string]: number;
        };
        /**
         * Range of allowed amount for transfer between accounts.
         */
        limits: {
          /**
           * Maximum allowed amount for transfer between accounts with different types of currencies.
           */
          max?: number;
          /**
           * Minimum allowed amount for transfer between accounts with different types of currencies.
           */
          min: number;
          [k: string]: unknown;
        } | null;
        /**
         * Range of allowed amount for transfer between ctrader accounts.
         */
        limits_ctrader?: {
          [k: string]: unknown;
        };
        /**
         * Range of allowed amount for transfer between dxtrade accounts.
         */
        limits_dxtrade?: {
          [k: string]: unknown;
        };
        /**
         * Range of allowed amount for transfer between mt5 accounts.
         */
        limits_mt5?: {
          [k: string]: unknown;
        };
      };
      /**
       * Type of the currency.
       */
      type: "fiat" | "crypto";
    };
  };
  /**
   * Feature flags related to the website/server for various features and options:
   *  - 'signup_with_optional_email_verification': Allow signup with optional email verification.
   */
  feature_flags?: string[];
  /**
   * Payments Agents system settings.
   */
  payment_agents?: {
    /**
     * Initial deposit requirement per country.
     */
    initial_deposit_per_country: {
      /**
       * Country code or default setting
       *
       * This interface was referenced by `undefined`'s JSON-Schema definition
       * via the `patternProperty` "^([a-z]{2}|default)$".
       */
      [k: string]: number;
    };
  };
  /**
   * Provides codes for languages supported.
   */
  supported_languages?: string[];
  /**
   * Latest terms and conditions version.
   */
  terms_conditions_version?: string;
}
/**
 * For subscription requests only.
 */
export interface SubscriptionInformation {
  /**
   * A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.
   */
  id: string;
}
/**
 * Verify an email address for various purposes. The system will send an email to the address containing a security code for verification.
 */
export interface VerifyEmailRequest {
  /**
   * Email address to be verified.
   */
  verify_email: string;
  /**
   * Purpose of email verification, request_email and reset_password are the only two types restricted from all unoffical apps
   */
  type:
    | "account_opening"
    | "account_verification"
    | "reset_password"
    | "paymentagent_withdraw"
    | "payment_withdraw"
    | "trading_platform_dxtrade_password_reset"
    | "trading_platform_mt5_password_reset"
    | "trading_platform_investor_password_reset"
    | "request_email"
    | "phone_number_verification";
  /**
   * [Optional] Extra parameters that can be attached to the verify email link URL.
   */
  url_parameters?: {
    /**
     * [Optional] Affiliate token, within 32 characters.
     */
    affiliate_token?: string;
    /**
     * [Optional] Date of first contact, format: yyyy-mm-dd in GMT timezone.
     */
    date_first_contact?: string;
    /**
     * [Optional] Google Click Identifier to track source.
     */
    gclid_url?: string;
    /**
     * [Optional] The amount to withdraw to the payment agent. Only allowed for payment agent withdraw.
     */
    pa_amount?: number;
    /**
     * [Optional] The currency code. Only allowed for payment agent withdraw.
     */
    pa_currency?: string;
    /**
     * [Optional] The payment agent loginid received from the `paymentagent_list` call. Only allowed for payment agent withdraw.
     */
    pa_loginid?: string;
    /**
     * [Optional] Remarks about the withdraw. Only letters, numbers, space, period, comma, - ' are allowed. Only allowed for payment agent withdraw.
     */
    pa_remarks?: string;
    /**
     * [Optional] The page ID to redirect to
     */
    redirect_to?: number;
    /**
     * [Optional] Show whether user has used mobile or desktop.
     */
    signup_device?: "desktop" | "mobile";
    /**
     * [Optional] Identifier of particular ad. Value must match Regex pattern to be recorded
     */
    utm_ad_id?: string;
    /**
     * [Optional] Identifier of ad group in the campaign. Value must match Regex pattern to be recorded
     */
    utm_adgroup_id?: string;
    /**
     * [Optional] Unique identifier of click on AdRoll ads platform. Value must match Regex pattern to be recorded
     */
    utm_adrollclk_id?: string;
    /**
     * [Optional] Identifies a specific product promotion or strategic campaign such as a spring sale or other promotions. Value must match Regex pattern to be recorded
     */
    utm_campaign?: string;
    /**
     * [Optional] Identifier of paid ad campaign. Value must match Regex pattern to be recorded
     */
    utm_campaign_id?: string;
    /**
     * [Optional] Used to differentiate similar content, or links within the same ad. Value must match Regex pattern to be recorded
     */
    utm_content?: string;
    /**
     * [Optional] Unique identifier of click on Facebook ads platform. Value must match Regex pattern to be recorded
     */
    utm_fbcl_id?: string;
    /**
     * [Optional] Unique visitor identifier on Google Ads platform. Value must match Regex pattern to be recorded
     */
    utm_gl_client_id?: string;
    /**
     * [Optional] Identifies the medium the link was used upon such as: email, CPC, or other methods of sharing. Value must match Regex pattern to be recorded
     */
    utm_medium?: string;
    /**
     * [Optional] Unique click identifier on Microsoft Bing ads platform. Value must match Regex pattern to be recorded
     */
    utm_msclk_id?: string;
    /**
     * [Optional] Identifies the source of traffic such as: search engine, newsletter, or other referral. Value must match Regex pattern to be recorded
     */
    utm_source?: string;
    /**
     * [Optional] Used to send information related to the campaign term like paid search keywords. Value must match Regex pattern to be recorded
     */
    utm_term?: string;
  };
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * 1 for success (secure code has been sent to the email address)
 */
export type VerifyEmail = 0 | 1;

/**
 * Verify Email Receive
 */
export interface VerifyEmailResponse {
  verify_email?: VerifyEmail;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "verify_email";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * It unsubscribe user from the email subscription.
 */
export interface UnsubscribeEmailRequest {
  /**
   * Must be `1`
   */
  unsubscribe_email: 1;
  /**
   * Customer User ID.
   */
  binary_user_id: number;
  /**
   * The generated checksum for the customer.
   */
  checksum: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * `1`: email notification unsubscribed sucssesfully, `0`: failed to unsubscribed email notification
 */
export type EmailUnsubscriptionStatus = 0 | 1;

/**
 * The result of the unsubscribe email request.
 */
export interface UnsubscribeEmailResponse {
  /**
   * Customer User ID.
   */
  binary_user_id?: number;
  email_unsubscribe_status?: EmailUnsubscriptionStatus;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "unsubscribe_email";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * This call allows transfers between accounts held by a given user. Transfer funds between your fiat and cryptocurrency accounts (for a fee). Please note that account_from should be same as current authorized account.
 */
export interface TransferBetweenAccountsRequest {
  /**
   * If `account_from` or `account_to` is not provided, it just returns the available accounts.
   */
  transfer_between_accounts: 1;
  /**
   * [Optional] The loginid of the account to transfer funds from.
   */
  account_from?: string;
  /**
   * [Optional] The loginid of the account to transfer funds to.
   */
  account_to?: string;
  /**
   * [Optional] To control the list of accounts returned when `account_from` or `account_to` is not provided. `brief` (default value) means that accounts with `mt5` account_type will be excluded; it will run faster. `all` means that all accounts with any account_type (including `mt5`) will be returned.
   */
  accounts?: "all" | "brief";
  /**
   * [Optional] The amount to transfer.
   */
  amount?: number;
  /**
   * [Optional] Currency code.
   */
  currency?: string;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * If set to 1, transfer succeeded.
 */
export type TransferBetweenAccounts = 0 | 1;

/**
 * The result of transfer order.
 */
export interface TransferBetweenAccountsResponse {
  transfer_between_accounts?: TransferBetweenAccounts;
  /**
   * The available accounts to transfer, or the accounts affected by a successful transfer.
   */
  accounts?: {
    /**
     * Category of the account.
     */
    account_category?: "trading" | "wallet";
    /**
     * Type of the account.
     */
    account_type?:
      | "binary"
      | "crypto"
      | "ctrader"
      | "doughflow"
      | "dxtrade"
      | "mt5"
      | "p2p"
      | "paymentagent"
      | "paymentagent_client"
      | "standard"
      | "virtual";
    /**
     * Account balance.
     */
    balance?: string;
    /**
     * Default account currency.
     */
    currency?: string;
    /**
     * 0 for real accounts; 1 for virtual/demo accounts.
     */
    demo_account?: 0 | 1;
    /**
     * Landing company shortcode of the Trading account.
     */
    landing_company_short?: string;
    /**
     * Account identifier used for system transfers.
     */
    loginid?: string;
    /**
     * Market type of account.
     */
    market_type?: "all" | "financial" | "synthetic";
    /**
     * The group of mt5 account.
     */
    mt5_group?: string;
    /**
     * Product name that Deriv offer
     */
    product?: "" | "synthetic" | "financial" | "swap_free" | "zero_spread" | "standard" | "stp";
    /**
     * The status of account.
     */
    status?: null | string;
    /**
     * Sub account type
     */
    sub_account_type?: "financial" | "financial_stp" | "standard" | "swap_free" | "zero_spread";
    /**
     * Type of transfers allowed between the account and the currently authorized account.
     */
    transfers?: "all" | "deposit" | "none" | "withdrawal";
  }[];
  /**
   * The account to client full name
   */
  client_to_full_name?: string;
  /**
   * The account to client loginid
   */
  client_to_loginid?: string;
  /**
   * Reference ID of transfer performed
   */
  transaction_id?: number;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "transfer_between_accounts";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Subscribe to transaction notifications
 */
export interface TransactionsStreamRequest {
  /**
   * Must be `1`
   */
  transaction: 1;
  /**
   * If set to 1, will send updates whenever there is an update to transactions. If not to 1 then it will not return any records.
   */
  subscribe: 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Return transaction updates
 */
export interface TransactionsStreamResponse {
  transaction?: Transaction;
  subscription?: SubscriptionInformation;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "transaction";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Realtime stream of user transaction updates.
 */
export interface Transaction {
  /**
   * The transaction type.
   */
  action?: "buy" | "sell" | "deposit" | "withdrawal" | "escrow" | "adjustment" | "virtual_credit" | "transfer";
  /**
   * It is the amount of transaction performed.
   */
  amount?: number;
  /**
   * Balance amount
   */
  balance?: number;
  /**
   * Barrier of the contract. Only applicable to single barrier contracts. Could be undefined if a contract does not have a barrier.
   */
  barrier?: null | number | string;
  /**
   * It is the contract ID.
   */
  contract_id?: number | null;
  /**
   * Transaction currency
   */
  currency?: string;
  /**
   * Epoch value of the expiry time of the contract. Please note that in case of buy transaction this is approximate value not exact one.
   */
  date_expiry?: number;
  /**
   * Display name of symbol
   */
  display_name?: string;
  /**
   * The high barrier of a contract. Only applicable to double barrier contracts.
   */
  high_barrier?: number | string;
  /**
   * A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.
   */
  id?: string;
  /**
   * Description of contract purchased
   */
  longcode?: string;
  /**
   * The low barrier of a contract. Only applicable to double barrier contracts.
   */
  low_barrier?: string;
  /**
   * Time at which contract was purchased, present only for sell transaction
   */
  purchase_time?: number;
  /**
   * The pip-sized target spot price where the contract will be closed automatically at the loss specified by the user.
   */
  stop_loss?: null | string;
  /**
   * The pip-sized target spot price where the contract will be closed automatically when the value of the contract is close to zero. This is set by the us.
   */
  stop_out?: null | string;
  /**
   * Symbol code
   */
  symbol?: string;
  /**
   * The pip-sized target spot price where the contract will be closed automatically at the profit specified by the user.
   */
  take_profit?: null | string;
  /**
   * It is the transaction ID. Every contract (buy or sell) or payment has a unique ID.
   */
  transaction_id?: number;
  /**
   * Time at which transaction was performed: for buy it is purchase time, for sell it is sell time.
   */
  transaction_time?: number;
}
/**
 * For subscription requests only.
 */
export interface SubscriptionInformation {
  /**
   * A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.
   */
  id: string;
}
/**
 * Receive a list of market opening times for a given date.
 */
export interface TradingTimesRequest {
  /**
   * Date to receive market opening times for. (`yyyy-mm-dd` format. `today` can also be specified).
   */
  trading_times: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * A message with Trading Times
 */
export interface TradingTimesResponse {
  trading_times?: TradingTimes;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "trading_times";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * The trading times structure is a hierarchy as follows: Market -> SubMarket -> Underlyings
 */
export interface TradingTimes {
  /**
   * An array of markets
   */
  markets: {
    /**
     * Market name
     */
    name: string;
    /**
     * An array of submarkets
     */
    submarkets?: {
      /**
       * Submarket name
       */
      name: string;
      /**
       * Symbols array
       */
      symbols: {
        /**
         * Events
         */
        events?: unknown[];
        /**
         * Symbol name
         */
        name: string;
        /**
         * Symbol shortcode
         */
        symbol: string;
        /**
         * Open, close and settlement times
         */
        times?: {
          [k: string]: unknown;
        };
        /**
         * Trading days
         */
        trading_days?: ("Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat")[];
      }[];
    }[];
  }[];
}
/**
 * Get the list of servers for a trading platform.
 */
export interface ServerListRequest {
  /**
   * Must be `1`
   */
  trading_servers: 1;
  /**
   * [Optional] Trading account type.
   */
  account_type?: "demo" | "real";
  /**
   * [Optional] Pass the environment (installation) instance. Currently, there are one demo and two real environments. Defaults to 'all'.
   */
  environment?: "all" | "Deriv-Demo" | "Deriv-Server" | "Deriv-Server-02" | "Deriv-Server-03";
  /**
   * [Optional] Market type.
   */
  market_type?: "all" | "financial" | "synthetic";
  /**
   * [Optional] Pass the trading platform name, default to mt5
   */
  platform?: "mt5" | "dxtrade";
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Array containing platform server objects.
 */
export type TradingServers = DetailsOfEachServer[];

/**
 * Get list of servers for the platform provided.
 */
export interface ServerListResponse {
  trading_servers?: TradingServers;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "trading_servers";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
export interface DetailsOfEachServer {
  /**
   * Supported trading account type.
   */
  account_type?: "demo" | "real";
  /**
   * Flag to represent if this server is currently disabled or not
   */
  disabled?: 0 | 1;
  /**
   * Current environment (installation instance) where servers are deployed. Currently, there are one demo and two real environments.
   */
  environment?: "Deriv-Demo" | "Deriv-Server" | "Deriv-Server-02" | "Deriv-Server-03";
  /**
   * Object containing geolocation information of the server.
   */
  geolocation?: {
    /**
     * Internal server grouping.
     */
    group?: string;
    /**
     * Geolocation country or place where server is located.
     */
    location?: string;
    /**
     * Geolocation region where server is located.
     */
    region?: string;
    /**
     * Sequence number of the server in that region.
     */
    sequence?: number;
  };
  /**
   * Server unique id.
   */
  id?: "p01_ts01" | "p01_ts02" | "p01_ts03" | "p01_ts04" | "p02_ts02" | "p03_ts01" | "p03_ts02";
  /**
   * Market type
   */
  market_type?: string;
  /**
   * Error message to client when server is disabled
   */
  message_to_client?: string;
  /**
   * Flag to represent if this is server is recommended based on client's country of residence.
   */
  recommended?: 0 | 1;
  /**
   * Account type supported by the server.
   */
  supported_accounts?: string[];
}
/**
 * Request trading platform status
 */
export interface TradingPlatformStatusRequest {
  /**
   * Must be `1`
   */
  trading_platform_status: 1;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Availability status of the trading platforms
 */
export type TradingPlatformStatus = unknown[];

/**
 * Provides current suspension status of trading platforms
 */
export interface TradingPlatformStatusResponse {
  trading_platform_status: TradingPlatformStatus;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "trading_platform_status";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
}
/**
 * Reset the password of a Trading Platform Account
 */
export interface TradingPlatformPasswordResetRequest {
  /**
   * Must be `1`
   */
  trading_platform_password_reset: 1;
  /**
   * New password of the account. For validation (Accepts any printable ASCII character. DerivX: Must be within 8-25 characters, include numbers, lowercase, uppercase letters. Must not be the same as the user's email address). Accepts any printable ASCII character. MT5: Must be within 8-16 characters, include numbers, lowercase, uppercase letters and special characters. Must not be the same as the user's email address.
   */
  new_password: string;
  /**
   * Name of trading platform.
   */
  platform: "dxtrade" | "mt5";
  /**
   * Email verification code (received from a `verify_email` call, which must be done first)
   */
  verification_code: string;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * If set to 1, the password has been reset.
 */
export type TradingPlatformPasswordReset = 0 | 1;

/**
 * The result of the Trading Platform password reset.
 */
export interface TradingPlatformPasswordResetResponse {
  trading_platform_password_reset?: TradingPlatformPasswordReset;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "trading_platform_password_reset";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Reset the investor password of a Trading Platform Account
 */
export interface TradingPlatformInvestorPasswordResetRequest {
  /**
   * Must be `1`
   */
  trading_platform_investor_password_reset: 1;
  /**
   * Trading account ID.
   */
  account_id: string;
  /**
   * New password of the account. For validation (Accepts any printable ASCII character. Must be within 8-16 characters, include numbers, lowercase, uppercase letters and special characters. Must not be the same as the user's email address).
   */
  new_password: string;
  /**
   * Name of trading platform.
   */
  platform: "mt5";
  /**
   * Email verification code (received from a `verify_email` call, which must be done first)
   */
  verification_code: string;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * If set to 1, the investor password has been reset.
 */
export type TradingPlatformInvestorPasswordReset = 0 | 1;

/**
 * The result of the Trading Platform investor password reset.
 */
export interface TradingPlatformInvestorPasswordResetResponse {
  trading_platform_password_reset?: TradingPlatformInvestorPasswordReset;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "trading_platform_investor_password_reset";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Retrieve a list of all available underlyings and the corresponding contract types and trading duration boundaries. If the user is logged in, only the assets available for that user's landing company will be returned.
 */
export interface TradingDurationsRequest {
  /**
   * Must be `1`
   */
  trading_durations: 1;
  /**
   * Deprecated - Replaced by landing_company_short.
   */
  landing_company?: "iom" | "malta" | "maltainvest" | "svg" | "virtual" | "vanuatu";
  /**
   * [Optional] If specified, will return only the underlyings for the specified landing company.
   */
  landing_company_short?: "iom" | "malta" | "maltainvest" | "svg" | "virtual" | "vanuatu";
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Available contract types and trading duration boundaries
 */
export type Data = {
  /**
   * The market in which the underlyings listed in `symbol` located.
   */
  market?: {
    /**
     * Translated market name.
     */
    display_name?: string;
    /**
     * Market name.
     */
    name?: string;
  };
  /**
   * The submarket in which the underlyings listed in `symbol` located.
   */
  submarket?: {
    /**
     * Translated submarket name.
     */
    display_name?: string;
    /**
     * Submarket name.
     */
    name?: string;
  };
  /**
   * List of underlying symbols.
   */
  symbol?: {
    /**
     * Translated symbol name.
     */
    display_name?: string;
    /**
     * Symbol name.
     */
    name?: string;
  }[];
  /**
   * List of trade durations available for symbols and contract combinations.
   */
  trade_durations?: {
    /**
     * List of trade durations available for the symbols.
     */
    durations?: {
      /**
       * Translated duration type name.
       */
      display_name?: string;
      /**
       * Maximum allowed duration for this type.
       */
      max?: number;
      /**
       * Minimum allowed duration for this type.
       */
      min?: number;
      /**
       * Duration type name.
       */
      name?: string;
    }[];
    /**
     * List of trade types available for the symbols.
     */
    trade_type?: {
      /**
       * Translated trade type name.
       */
      display_name?: string;
      /**
       * Trade type name.
       */
      name?: string;
    };
  }[];
}[];
/**
 * List of underlyings by their display name and symbol followed by their available contract types and trading duration boundaries.
 */
export type TradingDurations = {
  data?: Data;
  /**
   * The market in which the underlyings listed in `symbol` located.
   */
  market?: {
    /**
     * Translated market name.
     */
    display_name?: string;
    /**
     * Market name.
     */
    name?: string;
  };
  /**
   * The submarket in which the underlyings listed in `symbol` located.
   */
  submarket?: {
    /**
     * Translated submarket name.
     */
    display_name?: string;
    /**
     * Submarket name.
     */
    name?: string;
  };
}[];

/**
 * A message with trading duration information for symbol and contract combinations.
 */
export interface TradingDurationsResponse {
  trading_durations?: TradingDurations;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "trading_durations";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * When a virtual-money's account balance becomes low, it can be topped up using this call.
 */
export interface TopUpVirtualMoneyAccountRequest {
  /**
   * Must be `1`
   */
  topup_virtual: 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * The result of virtual money top up
 */
export interface TopUpVirtualMoneyAccountResponse {
  topup_virtual?: TopupVirtual;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "topup_virtual";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * The information regarding a successful top up for a virtual money account
 */
export interface TopupVirtual {
  /**
   * Top up amount
   */
  amount?: number;
  /**
   * Top up currency string
   */
  currency?: string;
}
/**
 * To approve the latest version of terms and conditions.
 */
export interface TermsAndConditionsApprovalRequest {
  /**
   * Must be `1`
   */
  tnc_approval: 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Set terms and conditions 1: success
 */
export type TncApproval = 1;

/**
 * The result of T&C approval request.
 */
export interface TermsAndConditionsApprovalResponse {
  tnc_approval?: TncApproval;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "tnc_approval";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Get the validations for Tax Identification Numbers (TIN)
 */
export interface TaxIdentificationNumberValidationsRequest {
  /**
   * Must be `1`
   */
  tin_validations: 1;
  /**
   * The tax residence selected by the client.
   */
  tax_residence: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * A message with validations for Tax Identification Numbers (TIN)
 */
export interface TaxIdentificationNumberValidationsResponse {
  tin_validations?: TinValidations;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "tin_validations";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Validations for Tax Identification Numbers (TIN)
 */
export interface TinValidations {
  /**
   * Invalid regex patterns for tin validation
   */
  invalid_patterns?: string[];
  /**
   * Whether the TIN is mandatory for the selected country
   */
  is_tin_mandatory?: 0 | 1;
  /**
   * List of employment statuses that bypass TIN requirements for the selected country
   */
  tin_employment_status_bypass?: string[];
  /**
   * Country tax identifier formats.
   */
  tin_format?: string[];
}
/**
 * Request back-end server epoch time.
 */
export interface ServerTimeRequest {
  /**
   * Must be `1`
   */
  time: 1;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Epoch of server time.
 */
export type Time = number;

/**
 * The result of server time request.
 */
export interface ServerTimeResponse {
  time?: Time;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "time";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Get historic tick data for a given symbol.
 */
export interface TicksHistoryRequest {
  /**
   * Short symbol name (obtained from the `active_symbols` call).
   */
  ticks_history: string;
  /**
   * [Optional] 1 - if the market is closed at the end time, or license limit is before end time, adjust interval backwards to compensate.
   */
  adjust_start_time?: 1;
  /**
   * [Optional] An upper limit on ticks to receive.
   */
  count?: number & string;
  /**
   * Epoch value representing the latest boundary of the returned ticks. If `latest` is specified, this will be the latest available timestamp.
   */
  end: string;
  /**
   * [Optional] Only applicable for style: `candles`. Candle time-dimension width setting. (default: `60`).
   */
  granularity?: 60 | 120 | 180 | 300 | 600 | 900 | 1800 | 3600 | 7200 | 14400 | 28800 | 86400;
  /**
   * [Optional] Epoch value representing the earliest boundary of the returned ticks.
   * - For `"style": "ticks"`: this will default to 1 day ago.
   * - For `"style": "candles"`: it will default to 1 day ago if count or granularity is undefined.
   */
  start?: number;
  /**
   * [Optional] The tick-output style.
   */
  style?: "candles" | "ticks";
  /**
   * [Optional] 1 - to send updates whenever a new tick is received.
   */
  subscribe?: 1;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Array of OHLC (open/high/low/close) price values for the given time (only for style=`candles`)
 */
export type Candles = {
  /**
   * It is the close price value for the given time
   */
  close?: number;
  /**
   * It is an epoch value
   */
  epoch?: number;
  /**
   * It is the high price value for the given time
   */
  high?: number;
  /**
   * It is the low price value for the given time
   */
  low?: number;
  /**
   * It is the open price value for the given time
   */
  open?: number;
}[];

/**
 * Historic tick data for a single symbol
 */
export interface TicksHistoryResponse {
  candles?: Candles;
  history?: History;
  /**
   * Indicates the number of decimal points that the returned amounts must be displayed with
   */
  pip_size?: number;
  subscription?: SubscriptionInformation;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Type of the response according to the `style` sent in request. Would be `history` or `candles` for the first response, and `tick` or `ohlc` for the rest when subscribed.
   */
  msg_type: "history" | "tick" | "candles" | "ohlc";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Historic tick data for a given symbol. Note: this will always return the latest possible set of ticks with accordance to the parameters specified.
 */
export interface History {
  /**
   * An array containing list of tick values for the corresponding epoch values in `times` array.
   */
  prices?: number[];
  /**
   * An array containing list of epoch values for the corresponding tick values in `prices` array.
   */
  times?: number[];
}
/**
 * For subscription requests only.
 */
export interface SubscriptionInformation {
  /**
   * A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.
   */
  id: string;
}
/**
 * Initiate a continuous stream of spot price updates for a given symbol.
 */
export interface TicksStreamRequest {
  /**
   * The short symbol name or array of symbols (obtained from `active_symbols` call).
   */
  ticks: string | string[];
  /**
   * [Optional] If set to 1, will send updates whenever a new tick is received.
   */
  subscribe?: 1;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Latest spot price for a given symbol. Continuous responses with a frequency of up to one second.
 */
export interface TicksStreamResponse {
  tick?: TickSpotData;
  subscription?: SubscriptionInformation;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Type of the response.
   */
  msg_type: "tick";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Tick by tick list of streamed data
 */
export interface TickSpotData {
  /**
   * Market ask at the epoch
   */
  ask?: number;
  /**
   * Market bid at the epoch
   */
  bid?: number;
  /**
   * Epoch time of the tick
   */
  epoch?: number;
  /**
   * A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.
   */
  id?: string;
  /**
   * Indicates the number of decimal points that the returned amounts must be displayed with
   */
  pip_size: number;
  /**
   * Market value at the epoch
   */
  quote?: number;
  /**
   * Symbol
   */
  symbol?: string;
}
/**
 * For subscription requests only.
 */
export interface SubscriptionInformation {
  /**
   * A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.
   */
  id: string;
}
/**
 * Client's 2-letter country code (obtained from `residence_list` call)
 */
// export type StatesList = string;

/**
 * For a given country, returns a list of States of that country. This is useful to populate the account opening form.
 */
export interface StatesListRequest {
  states_list: StatesList;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * List of states.
 */
export type StatesList = {
  /**
   * The state name.
   */
  text?: string;
  /**
   * The state code.
   */
  value?: string;
}[];

/**
 * A message with States List
 */
export interface StatesListResponse {
  states_list?: StatesList;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "states_list";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Retrieve a summary of account transactions, according to given search criteria
 */
export interface StatementRequest {
  /**
   * Must be `1`
   */
  statement: 1;
  /**
   * [Optional] To filter the statement according to the type of transaction.
   */
  action_type?: "buy" | "sell" | "deposit" | "withdrawal" | "escrow" | "adjustment" | "virtual_credit" | "transfer";
  /**
   * [Optional] Start date (epoch)
   */
  date_from?: number;
  /**
   * [Optional] End date (epoch)
   */
  date_to?: number;
  /**
   * [Optional] If set to 1, will return full contracts description.
   */
  description?: 0 | 1;
  /**
   * [Optional] Maximum number of transactions to receive.
   */
  limit?: number;
  /**
   * [Optional] Number of transactions to skip.
   */
  offset?: number;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * A summary of account statement is received
 */
export interface StatementResponse {
  statement?: Statement;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "statement";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Account statement.
 */
export interface Statement {
  /**
   * Number of transactions returned in this call
   */
  count?: number;
  /**
   * Array of returned transactions
   */
  transactions?: {
    /**
     * It is the type of action.
     */
    action_type?:
      | "buy"
      | "sell"
      | "deposit"
      | "withdrawal"
      | "hold"
      | "release"
      | "adjustment"
      | "virtual_credit"
      | "transfer";
    /**
     * It is the amount of transaction.
     */
    amount?: number;
    /**
     * ID of the application where this contract was purchased.
     */
    app_id?: number | null;
    /**
     * It is the remaining balance.
     */
    balance_after?: number;
    /**
     * It is the contract ID.
     */
    contract_id?: number | null;
    /**
     * Contains details about fees used for transfer. It is present only when action type is transfer.
     */
    fees?: {
      /**
       * Fees amount
       */
      amount?: number;
      /**
       * Fees currency
       */
      currency?: string;
      /**
       * Minimum amount of fees
       */
      minimum?: number;
      /**
       * Fees percentage
       */
      percentage?: number;
    };
    /**
     * Contains details of account from which amount was transferred. It is present only when action type is transfer.
     */
    from?: {
      /**
       * Login id of the account from which money was transferred.
       */
      loginid?: string;
    };
    /**
     * The description of contract purchased if description is set to `1`.
     */
    longcode?: string;
    /**
     * Payout price
     */
    payout?: null | number;
    /**
     * Time at which contract was purchased, present only for sell transaction
     */
    purchase_time?: number;
    /**
     * Internal transaction identifier for the corresponding buy transaction ( set only for contract selling )
     */
    reference_id?: number | null;
    /**
     * Compact description of the contract purchased if description is set to `1`.
     */
    shortcode?: null | string;
    /**
     * Contains details of account to which amount was transferred. It is present only when action type is transfer.
     */
    to?: {
      /**
       * Login id of the account to which money was transferred.
       */
      loginid?: string;
    };
    /**
     * It is the transaction ID. In statement every contract (buy or sell) and every payment has a unique ID.
     */
    transaction_id?: number;
    /**
     * It is the time of transaction.
     */
    transaction_time?: number;
    /**
     * Additional withdrawal details such as typical processing times, if description is set to `1`.
     */
    withdrawal_details?: string;
  }[];
}
/**
 * Set User Settings (this call should be used in conjunction with `get_settings`)
 */
export interface SetAccountSettingsRequest {
  /**
   * Must be `1`
   */
  set_settings: 1;
  /**
   * [Optional] Purpose and reason for requesting the account opening. Only applicable for real money account. Required for clients that have not set it yet. Can only be set once.
   */
  account_opening_reason?: "Speculative" | "Income Earning" | "Hedging" | "Peer-to-peer exchange";
  /**
   * [Optional] Note: not applicable for virtual account. Required field for real money account.
   */
  address_city?: string;
  /**
   * [Optional] Note: not applicable for virtual account. Required field for real money account.
   */
  address_line_1?: string;
  /**
   * [Optional] Note: not applicable for virtual account. Optional field for real money account.
   */
  address_line_2?: null | string;
  /**
   * [Optional] Note: not applicable for virtual account. Optional field for real money account.
   */
  address_postcode?: string;
  /**
   * [Optional] Note: not applicable for virtual account. Optional field for real money account.
   */
  address_state?: string;
  /**
   * [Optional] Boolean value 1 or 0, indicating permission to allow others to follow your trades. Note: not applicable for Virtual account. Only allow for real money account.
   */
  allow_copiers?: 0 | 1;
  /**
   * [Optional] Country of legal citizenship, 2-letter country code.
   */
  citizen?: null | string;
  /**
   * [Optional] Date of birth format: yyyy-mm-dd (can only be changed on unauthenticated svg accounts).
   */
  date_of_birth?: string;
  /**
   * Boolean value 1 or 0, indicating if user email belong to dxtrade exception list.
   */
  dxtrade_user_exception?: 0 | 1;
  /**
   * [Optional] Boolean value 1 or 0, indicating permission to use email address for any contact which may include marketing
   */
  email_consent?: 0 | 1;
  /**
   * [Optional] Employment Status.
   */
  employment_status?: "Employed" | "Pensioner" | "Self-Employed" | "Student" | "Unemployed";
  /**
   * [Optional] Enable or disable one or multiple features.
   */
  feature_flag?: {
    /**
     * [Optional] Boolean value 1 or 0 indicating whether to enable/disable this feature
     */
    wallet?: 0 | 1;
  };
  /**
   * [Optional] Within 1-50 characters, use only letters, spaces, hyphens, full-stops or apostrophes (can only be changed on unauthenticated svg accounts).
   */
  first_name?: string;
  /**
   * [Optional] Within 1-50 characters, use only letters, spaces, hyphens, full-stops or apostrophes (can only be changed on unauthenticated svg accounts).
   */
  last_name?: string;
  /**
   * [Optional] Indicates client's self-declaration of not being a PEP/RCA (Politically Exposed Person/Relatives and Close Associates). Effective for real accounts only.
   */
  non_pep_declaration?: 1;
  /**
   * [Optional] Note: not applicable for virtual account. Starting with `+` followed by 9-35 digits, hyphens or space.
   */
  phone?: null | string;
  /**
   * [Optional] Place of birth, 2-letter country code.
   */
  place_of_birth?: string;
  /**
   * [Optional] User's preferred language, ISO standard language code
   */
  preferred_language?: null | string;
  /**
   * [Optional] Required when client wants to be treated as professional. Applicable for financial accounts only.
   */
  request_professional_status?: 1;
  /**
   * [Optional] 2-letter country code. Note: not applicable for real money account. Only allow for Virtual account without residence set.
   */
  residence?: null | string;
  /**
   * [Optional] Accept any value in enum list (can only be changed on unauthenticated svg accounts).
   */
  salutation?: "Mr" | "Ms" | "Miss" | "Mrs";
  /**
   * [Optional] Answer to secret question, within 4-50 characters. Required for new account and existing client details will be used if client opens another account.
   */
  secret_answer?: string;
  /**
   * [Optional] Accept any value in enum list. Required for new account and existing client details will be used if client opens another account.
   */
  secret_question?:
    | "Mother's maiden name"
    | "Name of your pet"
    | "Name of first love"
    | "Memorable town/city"
    | "Memorable date"
    | "Favourite dish"
    | "Brand of first car"
    | "Favourite artist";
  /**
   * [Optional] Tax identification number. Only applicable for real money account. Required for maltainvest landing company.
   */
  tax_identification_number?: string;
  /**
   * [Optional] Residence for tax purpose. Comma separated iso country code if multiple jurisdictions. Only applicable for real money account. Required for maltainvest landing company.
   */
  tax_residence?: string;
  /**
   * [Optional] Whether the client has skipped the TIN form. Only applicable for real money account.
   */
  tin_skipped?: 0 | 1;
  /**
   * [Optional] Enable/Disable Trading Hub dashboard
   */
  trading_hub?: 0 | 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * 1 on success
 */
export type SetSettings = number;

/**
 * A message with User Settings
 */
export interface SetAccountSettingsResponse {
  set_settings?: SetSettings;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "set_settings";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Set Self-Exclusion (this call should be used in conjunction with `get_self_exclusion`)
 */
export interface SetSelfExclusionRequest {
  /**
   * Must be `1`
   */
  set_self_exclusion: 1;
  /**
   * [Optional] Exclude me from the website (for a minimum of 6 months, up to a maximum of 5 years). Note: uplifting this self-exclusion may require contacting the company.
   */
  exclude_until?: null | string;
  /**
   * [Optional] 7-day limit on deposits.
   */
  max_30day_deposit?: null | number;
  /**
   * [Optional] 30-day limit on losses.
   */
  max_30day_losses?: null | number;
  /**
   * [Optional] 30-day turnover limit.
   */
  max_30day_turnover?: null | number;
  /**
   * [Optional] 7-day limit on deposits.
   */
  max_7day_deposit?: null | number;
  /**
   * [Optional] 7-day limit on losses.
   */
  max_7day_losses?: null | number;
  /**
   * [Optional] 7-day turnover limit.
   */
  max_7day_turnover?: null | number;
  /**
   * [Optional] Maximum account cash balance.
   */
  max_balance?: null | number;
  /**
   * [Optional] Daily deposit limit.
   */
  max_deposit?: null | number;
  /**
   * [Optional] Daily limit on losses.
   */
  max_losses?: null | number;
  /**
   * [Optional] Maximum number of open positions.
   */
  max_open_bets?: number | null;
  /**
   * [Optional] Daily turnover limit.
   */
  max_turnover?: null | number;
  /**
   * [Optional] Session duration limit, in minutes.
   */
  session_duration_limit?: number | null;
  /**
   * [Optional] Exclude me from the website (for up to 6 weeks). Requires time in epoch format. Note: unlike `exclude_until`, this self-exclusion will be lifted automatically at the expiry of the timeout period.
   */
  timeout_until?: number | null;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * `1` on success
 */
export type SetSelfExclusion = number;

/**
 * A message with User Self-Exclusion
 */
export interface SetSelfExclusionResponse {
  set_self_exclusion?: SetSelfExclusion;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "set_self_exclusion";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * This call sets the financial assessment details based on the client's answers to analyze whether they possess the experience and knowledge to understand the risks involved with binary options trading.
 */
export interface SetFinancialAssessmentRequest {
  /**
   * Must be `1`
   */
  set_financial_assessment: 1;
  /**
   * [Optional] The anticipated account turnover.
   */
  account_turnover?:
    | "Less than $25,000"
    | "$25,000 - $50,000"
    | "$50,001 - $100,000"
    | "$100,001 - $500,000"
    | "Over $500,000";
  /**
   * [Optional] Binary options trading experience.
   */
  binary_options_trading_experience?: "0-1 year" | "1-2 years" | "Over 3 years";
  /**
   * [Optional] Binary options trading frequency.
   */
  binary_options_trading_frequency?:
    | "0-5 transactions in the past 12 months"
    | "6-10 transactions in the past 12 months"
    | "11-39 transactions in the past 12 months"
    | "40 transactions or more in the past 12 months";
  /**
   * [Optional] CFDs trading experience.
   */
  cfd_trading_experience?: "0-1 year" | "1-2 years" | "Over 3 years";
  /**
   * [Optional] CFDs trading frequency.
   */
  cfd_trading_frequency?:
    | "0-5 transactions in the past 12 months"
    | "6-10 transactions in the past 12 months"
    | "11-39 transactions in the past 12 months"
    | "40 transactions or more in the past 12 months";
  /**
   * [Optional] Level of Education.
   */
  education_level?: "Primary" | "Secondary" | "Tertiary";
  /**
   * [Optional] Industry of Employment.
   */
  employment_industry?:
    | "Construction"
    | "Education"
    | "Finance"
    | "Health"
    | "Tourism"
    | "Information & Communications Technology"
    | "Science & Engineering"
    | "Legal"
    | "Social & Cultural"
    | "Agriculture"
    | "Real Estate"
    | "Food Services"
    | "Manufacturing"
    | "Unemployed";
  /**
   * [Optional] Employment Status.
   */
  employment_status?: "Employed" | "Pensioner" | "Self-Employed" | "Student" | "Unemployed";
  /**
   * [Optional] Estimated Net Worth.
   */
  estimated_worth?:
    | "Less than $100,000"
    | "$100,000 - $250,000"
    | "$250,001 - $500,000"
    | "$500,001 - $1,000,000"
    | "Over $1,000,000";
  /**
   * [Optional] The financial information of a client
   */
  financial_information?: {
    /**
     * [Optional] The anticipated account turnover.
     */
    account_turnover?:
      | "Less than $25,000"
      | "$25,000 - $50,000"
      | "$50,001 - $100,000"
      | "$100,001 - $500,000"
      | "Over $500,000";
    /**
     * Level of Education.
     */
    education_level: "Primary" | "Secondary" | "Tertiary";
    /**
     * Industry of Employment.
     */
    employment_industry:
      | "Construction"
      | "Education"
      | "Finance"
      | "Health"
      | "Tourism"
      | "Information & Communications Technology"
      | "Science & Engineering"
      | "Legal"
      | "Social & Cultural"
      | "Agriculture"
      | "Real Estate"
      | "Food Services"
      | "Manufacturing"
      | "Unemployed";
    /**
     * [Optional] Employment Status.
     */
    employment_status?: "Employed" | "Pensioner" | "Self-Employed" | "Student" | "Unemployed";
    /**
     * Estimated Net Worth.
     */
    estimated_worth:
      | "Less than $100,000"
      | "$100,000 - $250,000"
      | "$250,001 - $500,000"
      | "$500,001 - $1,000,000"
      | "Over $1,000,000";
    /**
     * Income Source.
     */
    income_source:
      | "Salaried Employee"
      | "Self-Employed"
      | "Investments & Dividends"
      | "Pension"
      | "State Benefits"
      | "Savings & Inheritance";
    /**
     * Net Annual Income.
     */
    net_income:
      | "Less than $25,000"
      | "$25,000 - $50,000"
      | "$50,001 - $100,000"
      | "$100,001 - $500,000"
      | "Over $500,000";
    /**
     * Occupation.
     */
    occupation?:
      | "Chief Executives, Senior Officials and Legislators"
      | "Managers"
      | "Professionals"
      | "Clerks"
      | "Personal Care, Sales and Service Workers"
      | "Agricultural, Forestry and Fishery Workers"
      | "Craft, Metal, Electrical and Electronics Workers"
      | "Plant and Machine Operators and Assemblers"
      | "Cleaners and Helpers"
      | "Mining, Construction, Manufacturing and Transport Workers"
      | "Armed Forces"
      | "Government Officers"
      | "Students"
      | "Unemployed";
    /**
     * [Optional] Source of wealth.
     */
    source_of_wealth?:
      | "Accumulation of Income/Savings"
      | "Cash Business"
      | "Company Ownership"
      | "Divorce Settlement"
      | "Inheritance"
      | "Investment Income"
      | "Sale of Property";
  };
  /**
   * [Optional] Forex trading experience.
   */
  forex_trading_experience?: "0-1 year" | "1-2 years" | "Over 3 years";
  /**
   * [Optional] Forex trading frequency.
   */
  forex_trading_frequency?:
    | "0-5 transactions in the past 12 months"
    | "6-10 transactions in the past 12 months"
    | "11-39 transactions in the past 12 months"
    | "40 transactions or more in the past 12 months";
  /**
   * [Optional] Income Source.
   */
  income_source?:
    | "Salaried Employee"
    | "Self-Employed"
    | "Investments & Dividends"
    | "Pension"
    | "State Benefits"
    | "Savings & Inheritance";
  /**
   * [Optional] Net Annual Income.
   */
  net_income?:
    | "Less than $25,000"
    | "$25,000 - $50,000"
    | "$50,001 - $100,000"
    | "$100,001 - $500,000"
    | "Over $500,000";
  /**
   * [Optional] Occupation.
   */
  occupation?:
    | "Chief Executives, Senior Officials and Legislators"
    | "Managers"
    | "Professionals"
    | "Clerks"
    | "Personal Care, Sales and Service Workers"
    | "Agricultural, Forestry and Fishery Workers"
    | "Craft, Metal, Electrical and Electronics Workers"
    | "Plant and Machine Operators and Assemblers"
    | "Cleaners and Helpers"
    | "Mining, Construction, Manufacturing and Transport Workers"
    | "Armed Forces"
    | "Government Officers"
    | "Students"
    | "Unemployed";
  /**
   * [Optional] Trading experience in other financial instruments.
   */
  other_instruments_trading_experience?: "0-1 year" | "1-2 years" | "Over 3 years";
  /**
   * [Optional] Trading frequency in other financial instruments.
   */
  other_instruments_trading_frequency?:
    | "0-5 transactions in the past 12 months"
    | "6-10 transactions in the past 12 months"
    | "11-39 transactions in the past 12 months"
    | "40 transactions or more in the past 12 months";
  /**
   * [Optional] Source of wealth.
   */
  source_of_wealth?:
    | "Accumulation of Income/Savings"
    | "Cash Business"
    | "Company Ownership"
    | "Divorce Settlement"
    | "Inheritance"
    | "Investment Income"
    | "Sale of Property";
  /**
   * [Optional] The trading experience of a client
   */
  trading_experience?: {
    /**
     * [Optional] Binary options trading experience.
     */
    binary_options_trading_experience?: "0-1 year" | "1-2 years" | "Over 3 years";
    /**
     * [Optional] Binary options trading frequency.
     */
    binary_options_trading_frequency?:
      | "0-5 transactions in the past 12 months"
      | "6-10 transactions in the past 12 months"
      | "11-39 transactions in the past 12 months"
      | "40 transactions or more in the past 12 months";
    /**
     * [Optional] CFDs trading experience.
     */
    cfd_trading_experience?: "0-1 year" | "1-2 years" | "Over 3 years";
    /**
     * [Optional] CFDs trading frequency.
     */
    cfd_trading_frequency?:
      | "0-5 transactions in the past 12 months"
      | "6-10 transactions in the past 12 months"
      | "11-39 transactions in the past 12 months"
      | "40 transactions or more in the past 12 months";
    /**
     * [Optional] Forex trading experience.
     */
    forex_trading_experience?: "0-1 year" | "1-2 years" | "Over 3 years";
    /**
     * [Optional] Forex trading frequency.
     */
    forex_trading_frequency?:
      | "0-5 transactions in the past 12 months"
      | "6-10 transactions in the past 12 months"
      | "11-39 transactions in the past 12 months"
      | "40 transactions or more in the past 12 months";
    /**
     * [Optional] Trading experience in other financial instruments.
     */
    other_instruments_trading_experience?: "0-1 year" | "1-2 years" | "Over 3 years";
    /**
     * [Optional] Trading frequency in other financial instruments.
     */
    other_instruments_trading_frequency?:
      | "0-5 transactions in the past 12 months"
      | "6-10 transactions in the past 12 months"
      | "11-39 transactions in the past 12 months"
      | "40 transactions or more in the past 12 months";
  };
  /**
   * [Optional] The trading experience of a `maltainvest` client
   */
  trading_experience_regulated?: {
    /**
     * How much experience do you have in CFD trading?
     */
    cfd_experience: "No experience" | "Less than a year" | "1 - 2 years" | "Over 3 years";
    /**
     * How many CFD trades have you placed in the past 12 months?
     */
    cfd_frequency:
      | "No transactions in the past 12 months"
      | "1 - 5 transactions in the past 12 months"
      | "6 - 10 transactions in the past 12 months"
      | "11 - 39 transactions in the past 12 months"
      | "40 transactions or more in the past 12 months";
    /**
     * In your understanding, CFD trading allows you to:
     */
    cfd_trading_definition:
      | "Purchase shares of a company or physical commodities."
      | "Place a bet on the price movement."
      | "Speculate on the price movement."
      | "Make a long-term investment.";
    /**
     * How does leverage affect CFD trading?
     */
    leverage_impact_trading:
      | "Leverage is a risk mitigation technique."
      | "Leverage prevents you from opening large positions."
      | "Leverage guarantees profits."
      | "Leverage lets you open larger positions for a fraction of the trade's value.";
    /**
     * Leverage trading is high-risk, so it's a good idea to use risk management features such as stop loss. Stop loss allows you to
     */
    leverage_trading_high_risk_stop_loss:
      | "Cancel your trade at any time within a chosen timeframe."
      | "Close your trade automatically when the loss is more than or equal to a specific amount."
      | "Close your trade automatically when the profit is more than or equal to a specific amount."
      | "Make a guaranteed profit on your trade.";
    /**
     * When would you be required to pay an initial margin?
     */
    required_initial_margin:
      | "When opening a Leveraged CFD trade."
      | "When trading Multipliers."
      | "When buying shares of a company."
      | "All of the above.";
    /**
     * Do you understand that you could potentially lose 100% of the money you use to trade?
     */
    risk_tolerance: "Yes" | "No";
    /**
     * How much knowledge and experience do you have in relation to online trading?
     */
    source_of_experience:
      | "I have an academic degree, professional certification, and/or work experience."
      | "I trade forex CFDs and other complex financial instruments."
      | "I have attended seminars, training, and/or workshops."
      | "I have little experience."
      | "I have no knowledge.";
    /**
     * How much experience do you have with other financial instruments?
     */
    trading_experience_financial_instruments: "No experience" | "Less than a year" | "1 - 2 years" | "Over 3 years";
    /**
     * How many trades have you placed with other financial instruments in the past 12 months?
     */
    trading_frequency_financial_instruments:
      | "No transactions in the past 12 months"
      | "1 - 5 transactions in the past 12 months"
      | "6 - 10 transactions in the past 12 months"
      | "11 - 39 transactions in the past 12 months"
      | "40 transactions or more in the past 12 months";
  };
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Set Financial Assessment Receive
 */
export interface SetFinancialAssessmentResponse {
  set_financial_assessment?: SetFinancialAssessment;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "set_financial_assessment";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * The financial assessment score assigned to the submitted financial assessment
 */
export interface SetFinancialAssessment {
  /**
   * CFD score based on answers
   */
  cfd_score?: number;
  /**
   * Financial information score based on answers
   */
  financial_information_score?: number;
  /**
   * Financial Assessment score based on answers
   */
  total_score?: number;
  /**
   * Trading experience score based on answers
   */
  trading_score?: number;
}
/**
 * Set account currency, this will be default currency for your account i.e currency for trading, deposit. Please note that account currency can only be set once, and then can never be changed.
 */
export interface SetAccountCurrencyRequest {
  /**
   * Currency of the account. List of supported currencies can be acquired with `payout_currencies` call.
   */
  set_account_currency: string;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * `1`: success, `0`: no change
 */
export type SetAccountCurrency = 0 | 1;

/**
 * Status of set account currency call
 */
export interface SetAccountCurrencyResponse {
  set_account_currency?: SetAccountCurrency;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "set_account_currency";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * This call will try to sell any expired contracts and return the number of sold contracts.
 */
export interface SellExpiredContractsRequest {
  /**
   * Must be `1`
   */
  sell_expired: 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * The result of sell expired contract
 */
export interface SellExpiredContractsResponse {
  sell_expired?: SellExpired;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "sell_expired";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Sell expired contract object containing count of contracts sold
 */
export interface SellExpired {
  /**
   * The number of contracts that has been sold.
   */
  count?: number;
}
/**
 * Sell contracts for multiple accounts simultaneously. Uses the shortcode response from `buy_contract_for_multiple_accounts` to identify the contract, and authorisation tokens to select which accounts to sell those contracts on. Note that only the accounts identified by the tokens will be affected. This will not sell the contract on the currently-authorised account unless you include the token for the current account.
 */
export interface SellContractsMultipleAccountsRequest {
  /**
   * Must be `1`
   */
  sell_contract_for_multiple_accounts: 1;
  /**
   * Minimum price at which to sell the contract, or `0` for 'sell at market'.
   */
  price: number;
  /**
   * An internal ID used to identify the contract which was originally bought. This is returned from the `buy` and `buy_contract_for_multiple_accounts` calls.
   */
  shortcode: string;
  /**
   * Authorisation tokens which select the accounts to sell use for the affected accounts.
   */
  tokens: string[];
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Confirmation of the sale status for the selected contracts and accounts.
 */
export interface SellContractsMultipleAccountsResponse {
  sell_contract_for_multiple_accounts?: SellContractForMultipleAccounts;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "sell_contract_for_multiple_accounts";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Status information for each affected account.
 */
export interface SellContractForMultipleAccounts {
  /**
   * The result of sell for multiple accounts request.
   */
  result?: (
    | ReceiptForTheTransaction
    | {
        /**
         * An error code
         */
        code: string;
        /**
         * An error message localized according to the websocket
         */
        message_to_client: string;
        /**
         * The token designating the account
         */
        token: string;
      }
  )[];
}
/**
 * Receipt for the transaction
 */
export interface ReceiptForTheTransaction {
  /**
   * New account balance after completion of the sale
   */
  balance_after: number;
  /**
   * Internal contract identifier
   */
  contract_id: number;
  /**
   * Internal transaction identifier for the corresponding transaction
   */
  reference_id: number;
  /**
   * Actual effected sale price
   */
  sell_price: number;
  /**
   * date and time of sale `YYYY-MM-dd hh:mm:ss` format
   */
  sell_time?: string;
  /**
   * Internal transaction identifier for the contract sale transaction
   */
  transaction_id: number;
}
/**
 * Sell a Contract as identified from a previous `portfolio` call.
 */
export interface SellContractRequest {
  /**
   * Pass contract_id received from the `portfolio` call.
   */
  sell: number;
  /**
   * Minimum price at which to sell the contract, or `0` for 'sell at market'.
   */
  price: number;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * A message with transaction results is received
 */
export interface SellContractResponse {
  sell?: Sell;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "sell";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Receipt for the transaction
 */
export interface Sell {
  /**
   * New account balance after completion of the sale
   */
  balance_after?: number;
  /**
   * Internal contract identifier for the sold contract
   */
  contract_id?: number;
  /**
   * Internal transaction identifier for the corresponding buy transaction
   */
  reference_id?: number;
  /**
   * Actual effected sale price
   */
  sold_for?: number;
  /**
   * Internal transaction identifier for the sale transaction
   */
  transaction_id?: number;
}
/**
 * Used for revoking access of particular app.
 */
export interface RevokeOauthApplicationRequest {
  /**
   * The application ID to revoke.
   */
  revoke_oauth_app: number;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * `1` on success
 */
export type RevokeOauthApp = number;

/**
 * A message with revoking a used application
 */
export interface RevokeOauthApplicationResponse {
  revoke_oauth_app?: RevokeOauthApp;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "revoke_oauth_app";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * This call returns a list of countries and 2-letter country codes, suitable for populating the account opening form.
 */
export interface CountriesListRequest {
  /**
   * Must be `1`
   */
  residence_list: 1;
  /**
   * [Optional] Specific keys from the response that you want. If not passed, it will return all the keys.
   */
  query?: (
    | "account_opening_self_declaration_required"
    | "common_reporting_standard"
    | "disabled"
    | "identity"
    | "jurisdiction_risk_assessment"
    | "phone_idd"
    | "selected"
    | "text"
    | "tin_format"
    | "value"
    | "wallet_signup"
  )[];
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * List of countries for account opening
 */
export type ResidenceList = {
  /**
   * Flag which indicates whether self declaration is required for account opening
   */
  account_opening_self_declaration_required?: 0 | 1;
  /**
   * Common Reporting Standard
   */
  common_reporting_standard?: {
    /**
     * NPJ configuration
     */
    non_participating_jurisdictions?: {
      /**
       * Default NPJ flag
       */
      default?: boolean;
      /**
       * Flags for specific landing companies
       */
      landing_company?: {
        /**
         * Landing company NPJ flag
         *
         * This interface was referenced by `undefined`'s JSON-Schema definition
         * via the `patternProperty` "^[a-z]{1,10}$".
         */
        [k: string]: boolean;
      };
    };
    /**
     * Postcode configuration
     */
    postcode?: {
      /**
       * Invalid regex patterns for postcode validation
       */
      invalid_pattern?: null | string;
    };
    /**
     * Tax configuration
     */
    tax?: {
      /**
       * Mandatory TIN flag
       */
      mandatory?: boolean;
      /**
       * POI equivalent flag
       */
      poi_equivalent?: boolean;
      /**
       * Cleanup regex
       */
      tin_cleaner?: string;
      /**
       * Country tax identifier format
       */
      tin_format?: string[];
      /**
       * Description of the TIN format
       */
      tin_format_description?: null | string;
    };
  };
  /**
   * Disabled.
   */
  disabled?: string;
  /**
   * Information about identity options available
   */
  identity?: {
    /**
     * Identity services configuration
     */
    services?: {
      /**
       * IDV configuration
       */
      idv?: {
        /**
         * Documents supported by the IDV service in this country
         */
        documents_supported?: {
          /**
           * Document type
           *
           * This interface was referenced by `undefined`'s JSON-Schema definition
           * via the `patternProperty` "^\w+$".
           */
          [k: string]: {
            /**
             * [Optional] Additional input required from the user
             */
            additional?: {
              /**
               * The localized display name
               */
              display_name?: string;
              /**
               * [Optional] Regex pattern to validate documents
               */
              format?: string;
            };
            /**
             * The localized display name
             */
            display_name?: string;
            /**
             * [Optional] Regex pattern to validate documents
             */
            format?: string;
          };
        };
        /**
         * Flag which indicates whether this country has IDV visual samples
         */
        has_visual_sample?: 0 | 1;
        /**
         * Flag which indicates whether IDV is available in this country
         */
        is_country_supported?: 0 | 1;
      };
      /**
       * Onfido configuration
       */
      onfido?: {
        /**
         * Documents supported by the IDV service in this country
         */
        documents_supported?: {
          /**
           * Document type
           *
           * This interface was referenced by `undefined`'s JSON-Schema definition
           * via the `patternProperty` "^\w+$".
           */
          [k: string]: {
            /**
             * The localized display name
             */
            display_name?: string;
            /**
             * [Optional] Regex pattern to validate documents
             */
            format?: string;
          };
        };
        /**
         * Flag which indicates whether Onfido is available in this country
         */
        is_country_supported?: 0 | 1;
      };
    };
  };
  /**
   * Jurisdiction Risk Assessment
   */
  jurisdiction_risk_assessment?: {
    /**
     * Disclaimer configuration
     */
    disclaimer?: {
      /**
       * Disclaimer flag
       */
      accept?: boolean;
      /**
       * Disclaimer message
       */
      message?: string;
    };
    /**
     * Risk level configuration
     */
    risk_level?: {
      /**
       * Default risk level flag
       */
      default?: string;
      /**
       * Flags for specific landing companies
       */
      landing_company?: {
        /**
         * Landing company risk level flag
         *
         * This interface was referenced by `undefined`'s JSON-Schema definition
         * via the `patternProperty` "^[a-z]{1,10}$".
         */
        [k: string]: string;
      };
    };
    /**
     * Turnover configuration
     */
    turnover?: {
      /**
       * Max limit
       */
      max_limit?: boolean;
    };
  };
  /**
   * Flag which indicates whether partner signup is available in this country
   */
  partner_signup?: 0 | 1;
  /**
   * IDD code of country
   */
  phone_idd?: null | string;
  /**
   * Selected.
   */
  selected?: string;
  /**
   * Country full name
   */
  text?: string;
  /**
   * Country tax identifier format
   */
  tin_format?: string[];
  /**
   * 2-letter country code
   */
  value?: string;
  /**
   * Flag which indicates whether wallet signup is available in this country
   */
  wallet_signup?: 1;
}[];

/**
 * A message with Residence List
 */
export interface CountriesListResponse {
  residence_list?: ResidenceList;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "residence_list";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Retrieve summary of client's trades and account for the Reality Check facility. A 'reality check' means a display of time elapsed since the session began, and associated client profit/loss. The Reality Check facility is a regulatory requirement for certain landing companies.
 */
export interface RealityCheckRequest {
  /**
   * Must be `1`
   */
  reality_check: 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * This gives summary of client's trades and account for reality check
 */
export interface RealityCheckResponse {
  reality_check?: RealityCheck;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "reality_check";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Reality check summary of trades.
 */
export interface RealityCheck {
  /**
   * Total amount of contract purchased.
   */
  buy_amount?: number;
  /**
   * Total count of contract purchased.
   */
  buy_count?: number;
  /**
   * Currency of client account i.e currency for trading
   */
  currency?: string;
  /**
   * Client loginid.
   */
  loginid?: string;
  /**
   * Total count of contracts that are not yet expired.
   */
  open_contract_count?: number;
  /**
   * Indicative profit of contract as per current market price.
   */
  potential_profit?: number;
  /**
   * Total amount of contracts sold.
   */
  sell_amount?: number;
  /**
   * Total count of contract sold.
   */
  sell_count?: number;
  /**
   * Reality check summary start time epoch
   */
  start_time?: number;
}
/**
 * Get latest price (and other information) for a contract in the user's portfolio
 */
export interface PriceProposalOpenContractsRequest {
  /**
   * Must be `1`
   */
  proposal_open_contract: 1;
  /**
   * [Optional] Contract ID received from a `portfolio` request. If not set, you will receive stream of all open contracts.
   */
  contract_id?: number;
  /**
   * [Optional] `1` to stream.
   */
  subscribe?: 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Tick details around contract start and end time.
 */
export type AuditDetailsForExpiredContract = null | {
  /**
   * Ticks for tick expiry contract from start time till expiry.
   */
  all_ticks?: {
    /**
     * Epoch time of a tick or the contract start or end time.
     */
    epoch?: number;
    /**
     * A flag used to highlight the record in front-end applications.
     */
    flag?: null | string;
    /**
     * A short description of the data. It could be a tick or a time associated with the contract.
     */
    name?: null | string;
    /**
     * The spot value at the given epoch.
     */
    tick?: null | number;
    /**
     * The spot value with the correct precision at the given epoch.
     */
    tick_display_value?: null | string;
  }[];
  /**
   * Ticks around contract end time.
   */
  contract_end?: {
    /**
     * Epoch time of a tick or the contract start or end time.
     */
    epoch?: number;
    /**
     * A flag used to highlight the record in front-end applications.
     */
    flag?: null | string;
    /**
     * A short description of the data. It could be a tick or a time associated with the contract.
     */
    name?: null | string;
    /**
     * The spot value at the given epoch.
     */
    tick?: null | number;
    /**
     * The spot value with the correct precision at the given epoch.
     */
    tick_display_value?: null | string;
  }[];
  /**
   * Ticks around contract start time.
   */
  contract_start?: {
    /**
     * Epoch time of a tick or the contract start or end time.
     */
    epoch?: number;
    /**
     * A flag used to highlight the record in front-end applications.
     */
    flag?: null | string;
    /**
     * A short description of the data. It could be a tick or a time associated with the contract.
     */
    name?: null | string;
    /**
     * The spot value at the given epoch.
     */
    tick?: null | number;
    /**
     * The spot value with the correct precision at the given epoch.
     */
    tick_display_value?: null | string;
  }[];
};
/**
 * Contract status. Will be `sold` if the contract was sold back before expiry, `won` if won and `lost` if lost at expiry. Otherwise will be `open`
 */
export type ContractStatus = "open" | "sold" | "won" | "lost" | "cancelled" | null;

/**
 * Latest price and other details for an open contract in the user's portfolio
 */
export interface PriceProposalOpenContractsResponse {
  proposal_open_contract?: ProposalOpenContract;
  subscription?: SubscriptionInformation;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type?: "proposal_open_contract";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Latest price and other details for an open contract
 */
export interface ProposalOpenContract {
  /**
   * Account Id
   */
  account_id?: number;
  /**
   * The markup amount charged on a client's stake amount
   */
  app_markup_amount?: string;
  audit_details?: AuditDetailsForExpiredContract;
  /**
   * Barrier of the contract (if any).
   */
  barrier?: null | string;
  /**
   * The number of barriers a contract has.
   */
  barrier_count?: number;
  /**
   * [Only for accumulator] Absolute difference between high/low barrier and spot
   */
  barrier_spot_distance?: string;
  /**
   * Price at which the contract could be sold back to the company.
   */
  bid_price?: number;
  /**
   * Price at which contract was purchased
   */
  buy_price?: number;
  /**
   * Contains information about contract cancellation option.
   */
  cancellation?: {
    /**
     * Ask price of contract cancellation option.
     */
    ask_price?: number;
    /**
     * Expiry time in epoch for contract cancellation option.
     */
    date_expiry?: number;
  };
  /**
   * Commission in payout currency amount.
   */
  commision?: null | number;
  /**
   * Commission in payout currency amount.
   */
  commission?: null | number;
  /**
   * The internal contract identifier
   */
  contract_id?: number;
  /**
   * Contract type.
   */
  contract_type?: string;
  /**
   * The currency code of the contract.
   */
  currency?: string;
  /**
   * Spot value if we have license to stream this symbol.
   */
  current_spot?: number;
  /**
   * Spot value with the correct precision if we have license to stream this symbol.
   */
  current_spot_display_value?: string;
  /**
   * [Applicable for accumulator] High barrier based on current spot.
   */
  current_spot_high_barrier?: string;
  /**
   * [Applicable for accumulator] Low barrier based on current spot.
   */
  current_spot_low_barrier?: string;
  /**
   * The corresponding time of the current spot.
   */
  current_spot_time?: number;
  /**
   * Expiry date (epoch) of the Contract. Please note that it is not applicable for tick trade contracts.
   */
  date_expiry?: number;
  /**
   * Settlement date (epoch) of the contract.
   */
  date_settlement?: number;
  /**
   * Start date (epoch) of the contract.
   */
  date_start?: number;
  /**
   * Display name of underlying
   */
  display_name?: string;
  /**
   * [Only for vanilla or turbos options] The implied number of contracts
   */
  display_number_of_contracts?: string;
  /**
   * The `bid_price` with the correct precision
   */
  display_value?: string;
  /**
   * Same as `entry_tick`. For backwards compatibility.
   */
  entry_spot?: null | number;
  /**
   * Same as `entry_tick_display_value`. For backwards compatibility.
   */
  entry_spot_display_value?: null | string;
  /**
   * This is the entry spot of the contract. For contracts starting immediately it is the next tick after the start time. For forward-starting contracts it is the spot at the start time.
   */
  entry_tick?: number;
  /**
   * This is the entry spot with the correct precision of the contract. For contracts starting immediately it is the next tick after the start time. For forward-starting contracts it is the spot at the start time.
   */
  entry_tick_display_value?: string;
  /**
   * This is the epoch time of the entry tick.
   */
  entry_tick_time?: number;
  /**
   * Exit tick can refer to the latest tick at the end time, the tick that fulfils the contract's winning or losing condition for path dependent contracts (Touch/No Touch and Stays Between/Goes Outside) or the tick at which the contract is sold before expiry.
   */
  exit_tick?: number;
  /**
   * Exit tick can refer to the latest tick at the end time, the tick that fulfils the contract's winning or losing condition for path dependent contracts (Touch/No Touch and Stays Between/Goes Outside) or the tick at which the contract is sold before expiry.
   */
  exit_tick_display_value?: string;
  /**
   * This is the epoch time of the exit tick. Note that since certain instruments don't tick every second, the exit tick time may be a few seconds before the end time.
   */
  exit_tick_time?: number;
  /**
   * This is the expiry time.
   */
  expiry_time?: number;
  /**
   * [Only for accumulator] Growth rate of an accumulator contract.
   */
  growth_rate?: number;
  /**
   * High barrier of the contract (if any).
   */
  high_barrier?: string;
  /**
   * A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.
   */
  id?: string;
  /**
   * Whether the contract is expired or not.
   */
  is_expired?: 0 | 1;
  /**
   * Whether the contract is forward-starting or not.
   */
  is_forward_starting?: 0 | 1;
  /**
   * Whether the contract is an intraday contract.
   */
  is_intraday?: 0 | 1;
  /**
   * Whether the contract expiry price will depend on the path of the market (e.g. One Touch contract).
   */
  is_path_dependent?: 0 | 1;
  /**
   * Whether the contract is settleable or not.
   */
  is_settleable?: 0 | 1;
  /**
   * Whether the contract is sold or not.
   */
  is_sold?: 0 | 1;
  /**
   * Whether the contract can be cancelled.
   */
  is_valid_to_cancel?: 0 | 1;
  /**
   * Whether the contract can be sold back to the company.
   */
  is_valid_to_sell?: 0 | 1;
  /**
   * [Optional] Indicator whether take profit, stop loss, and/or stop out is allowed to be updated.
   */
  is_valid_to_update?: null | {
    /**
     * [Optional] 1 if stop loss is allowed to be updated and 0 if otherwise. This field is undefined if stop loss functionality is not supported by the contract.
     */
    stop_loss?: (0 | 1) | null;
    /**
     * [Optional] 1 if stop out is allowed to be updated and 0 if otherwise. This field is undefined if stop out functionality is not supported by the contract.
     */
    stop_out?: (0 | 1) | null;
    /**
     * [Optional] 1 if take profit is allowed to be updated and 0 if otherwise. This field is undefined if take profit functionality is not supported by the contract.
     */
    take_profit?: (0 | 1) | null;
  };
  /**
   * Orders are applicable to `MULTUP` and `MULTDOWN` contracts only.
   */
  limit_order?: {
    /**
     * Contains information where the contract will be closed automatically at the loss specified by the user.
     */
    stop_loss?: {
      /**
       * Localized display name
       */
      display_name?: string;
      /**
       * Stop loss amount for display purpose.
       */
      display_order_amount?: null | string;
      /**
       * Stop loss amount. Will be deprecated soon. Please use [display_order_amount].
       */
      order_amount?: null | number;
      /**
       * Stop loss order epoch
       */
      order_date?: number;
      /**
       * Pip-sized barrier value
       */
      value?: null | string;
    };
    /**
     * Contains information where the contract will be closed automatically when the value of the contract is close to zero. This is set by the us.
     */
    stop_out?: {
      /**
       * Localized display name
       */
      display_name?: string;
      /**
       * Stop out amount for display purpose.
       */
      display_order_amount?: null | string;
      /**
       * Stop out amount. Will be deprecated soon. Please use [display_order_amount].
       */
      order_amount?: null | number;
      /**
       * Stop out order epoch
       */
      order_date?: number;
      /**
       * Pip-sized barrier value
       */
      value?: string;
    };
    /**
     * Contain information where the contract will be closed automatically at the profit specified by the user.
     */
    take_profit?: {
      /**
       * Localized display name
       */
      display_name?: string;
      /**
       * Take profit amount for display purpose.
       */
      display_order_amount?: null | string;
      /**
       * Take profit amount. Will be deprecated soon. Please use [display_order_amount].
       */
      order_amount?: null | number;
      /**
       * Take profit order epoch
       */
      order_date?: number;
      /**
       * Pip-sized barrier value
       */
      value?: null | string;
    };
  };
  /**
   * Text description of the contract purchased, Example: Win payout if Volatility 100 Index is strictly higher than entry spot at 10 minutes after contract start time.
   */
  longcode?: string;
  /**
   * Low barrier of the contract (if any).
   */
  low_barrier?: string;
  /**
   * [Only for lookback trades] Multiplier applies when calculating the final payoff for each type of lookback. e.g. (Exit spot - Lowest historical price) * multiplier = Payout
   */
  multiplier?: number;
  /**
   * Payout value of the contract.
   */
  payout?: number;
  /**
   * The latest bid price minus buy price.
   */
  profit?: number;
  /**
   * Profit in percentage.
   */
  profit_percentage?: number;
  /**
   * Epoch of purchase time, will be same as `date_start` for all contracts except forward starting contracts.
   */
  purchase_time?: number;
  /**
   * [Only for reset trades i.e. RESETCALL and RESETPUT] Reset barrier of the contract.
   */
  reset_barrier?: null | string;
  /**
   * [Only for reset trades i.e. RESETCALL and RESETPUT] The epoch time of a barrier reset.
   */
  reset_time?: number;
  /**
   * Spot value at the selected tick for the contract.
   */
  selected_spot?: number;
  /**
   * [Only for highlowticks trades i.e. TICKHIGH and TICKLOW] Selected tick for the contract.
   */
  selected_tick?: number;
  /**
   * Price at which contract was sold, only available when contract has been sold.
   */
  sell_price?: number;
  /**
   * Latest spot value at the sell time. (only present for contracts already sold). Will no longer be supported in the next API release.
   */
  sell_spot?: number;
  /**
   * Latest spot value with the correct precision at the sell time. (only present for contracts already sold). Will no longer be supported in the next API release.
   */
  sell_spot_display_value?: string;
  /**
   * Epoch time of the sell spot. Note that since certain underlyings don't tick every second, the sell spot time may be a few seconds before the sell time. (only present for contracts already sold). Will no longer be supported in the next API release.
   */
  sell_spot_time?: number;
  /**
   * Epoch time of when the contract was sold (only present for contracts already sold)
   */
  sell_time?: number | null;
  /**
   * Coded description of the contract purchased.
   */
  shortcode?: string;
  status?: ContractStatus;
  /**
   * Only for tick trades, number of ticks
   */
  tick_count?: number;
  /**
   * [Only for accumulator] Number of ticks passed since entry_tick
   */
  tick_passed?: number;
  /**
   * Tick stream from entry to end time.
   */
  tick_stream?: {
    /**
     * Epoch time of a tick or the contract start or end time.
     */
    epoch?: number;
    /**
     * The spot value at the given epoch.
     */
    tick?: null | number;
    /**
     * The spot value with the correct precision at the given epoch.
     */
    tick_display_value?: null | string;
  }[];
  transaction_ids?: TransactionIdsForContract;
  /**
   * The underlying symbol code.
   */
  underlying?: string;
  /**
   * Error message if validation fails
   */
  validation_error?: string;
  /**
   * Error code if validation fails
   */
  validation_error_code?: string;
  /**
   * Contains contract validation information.
   */
  validation_params?: {
    /**
     * [Only for Accumulators] Maximum payout for the contract.
     */
    max_payout?: string;
    /**
     * [Only for Accumulators] Maximum ticks for the contract.
     */
    max_ticks?: number;
    /**
     * Contains information for minimum and maximum stake amount for the contract.
     */
    stake?: {
      /**
       * Maximum stakes allowed
       */
      max?: string;
      /**
       * Minimum stakes allowed
       */
      min?: string;
    };
    /**
     * [Only for Multipliers] Contains information for minimum and maximum stop loss amount for the contract.
     */
    stop_loss?: {
      /**
       * Maximum stop loss amount
       */
      max?: string;
      /**
       * Minimum stop loss amount
       */
      min?: string;
    };
    /**
     * Contains information for minimum and maximum take profit amount for the contract.
     */
    take_profit?: {
      /**
       * Maximum take profit amount
       */
      max?: string;
      /**
       * Minimum take profit amount
       */
      min?: string;
    };
  };
}
/**
 * Every contract has buy and sell transaction ids, i.e. when you purchase a contract we associate it with buy transaction id, and if contract is already sold we associate that with sell transaction id.
 */
export interface TransactionIdsForContract {
  /**
   * Buy transaction ID for that contract
   */
  buy?: number;
  /**
   * Sell transaction ID for that contract, only present when contract is already sold.
   */
  sell?: number;
}
/**
 * For subscription requests only.
 */
export interface SubscriptionInformation {
  /**
   * A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.
   */
  id: string;
}
/**
 * Gets latest price for a specific contract.
 */
export interface PriceProposalRequest {
  /**
   * Must be `1`
   */
  proposal: 1;
  /**
   * [Optional] Proposed contract payout or stake, or multiplier (for lookbacks).
   */
  amount?: number;
  /**
   * [Optional] Barrier for the contract (or last digit prediction for digit contracts). Contracts less than 24 hours in duration would need a relative barrier (barriers which need +/-), where entry spot would be adjusted accordingly with that amount to define a barrier, except for Synthetic Indices as they support both relative and absolute barriers. Not needed for lookbacks.
   */
  barrier?: string;
  /**
   * [Optional] Low barrier for the contract (for contracts with two barriers). Contracts less than 24 hours in duration would need a relative barrier (barriers which need +/-), where entry spot would be adjusted accordingly with that amount to define a barrier, except for Synthetic Indices as they support both relative and absolute barriers. Not needed for lookbacks.
   */
  barrier2?: string;
  /**
   * [Optional] Barrier range for callputspread.
   */
  barrier_range?: "tight" | "middle" | "wide";
  /**
   * [Optional] Indicates type of the `amount`.
   */
  basis?: "payout" | "stake";
  /**
   * Cancellation duration option (only for `MULTUP` and `MULTDOWN` contracts).
   */
  cancellation?: string;
  /**
   * The proposed contract type
   */
  contract_type:
    | "MULTUP"
    | "MULTDOWN"
    | "UPORDOWN"
    | "EXPIRYRANGE"
    | "ONETOUCH"
    | "CALLE"
    | "LBHIGHLOW"
    | "ASIAND"
    | "EXPIRYRANGEE"
    | "DIGITDIFF"
    | "DIGITMATCH"
    | "DIGITOVER"
    | "PUTE"
    | "DIGITUNDER"
    | "NOTOUCH"
    | "CALL"
    | "RANGE"
    | "LBFLOATPUT"
    | "DIGITODD"
    | "PUT"
    | "ASIANU"
    | "LBFLOATCALL"
    | "EXPIRYMISSE"
    | "EXPIRYMISS"
    | "DIGITEVEN"
    | "TICKHIGH"
    | "TICKLOW"
    | "RESETCALL"
    | "RESETPUT"
    | "CALLSPREAD"
    | "PUTSPREAD"
    | "RUNHIGH"
    | "RUNLOW"
    | "ACCU"
    | "VANILLALONGCALL"
    | "VANILLALONGPUT"
    | "TURBOSLONG"
    | "TURBOSSHORT";
  /**
   * This can only be the account-holder's currency (obtained from `payout_currencies` call).
   */
  currency: string;
  /**
   * [Optional] Epoch value of the expiry time of the contract. Either date_expiry or duration is required.
   */
  date_expiry?: number;
  /**
   * [Optional] Indicates epoch value of the starting time of the contract. If left empty, the start time of the contract is now.
   */
  date_start?: number;
  /**
   * [Optional] Duration quantity. Either date_expiry or duration is required.
   */
  duration?: number;
  /**
   * [Optional] Duration unit - `s`: seconds, `m`: minutes, `h`: hours, `d`: days, `t`: ticks.
   */
  duration_unit?: "d" | "m" | "s" | "h" | "t";
  /**
   * [Optional] Growth rate of an accumulator contract.
   */
  growth_rate?: number;
  /**
   * Add an order to close the contract once the order condition is met (only for `MULTUP` and `MULTDOWN` and 'ACCU' contracts). Supported orders: `take_profit`, `stop_loss`.
   */
  limit_order?: {
    /**
     * Contract will be automatically closed when the value of the contract reaches a specific loss.
     */
    stop_loss?: number;
    /**
     * Contract will be automatically closed when the value of the contract reaches a specific profit.
     */
    take_profit?: number;
  };
  /**
   * [Optional] The multiplier for non-binary options. E.g. lookbacks.
   */
  multiplier?: number;
  /**
   * [Optional] Clients can provide payout_per_point directly, and the barrier will be calculated based on this payout_per_point value.
   */
  payout_per_point?: number;
  /**
   * [Optional] The product type.
   */
  product_type?: "basic";
  /**
   * [Optional] The tick that is predicted to have the highest/lowest value - for `TICKHIGH` and `TICKLOW` contracts.
   */
  selected_tick?: number;
  /**
   * [Optional] 1 - to initiate a realtime stream of prices. Note that tick trades (without a user-defined barrier), digit trades and less than 24 hours at-the-money contracts for the following underlying symbols are not streamed: `R_10`, `R_25`, `R_50`, `R_75`, `R_100`, `RDBULL`, `RDBEAR` (this is because their price is constant).
   */
  subscribe?: 1;
  /**
   * The short symbol name (obtained from `active_symbols` call).
   */
  symbol: string;
  /**
   * [Optional] Required only for multi-barrier trading. Defines the epoch value of the trading period start time.
   */
  trading_period_start?: number;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Latest price and other details for a given contract
 */
export interface PriceProposalResponse {
  proposal?: Proposal;
  subscription?: SubscriptionInformation;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "proposal";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Latest price and other details for a given contract
 */
export interface Proposal {
  /**
   * The ask price.
   */
  ask_price: number;
  /**
   * [Only for vanilla options] The choices of predefined strike price for client to choose
   */
  barrier_choices?: unknown[];
  /**
   * [Only for Turbos] The relative distance between current spot and the barrier.
   */
  barrier_spot_distance?: string;
  /**
   * Contains information about contract cancellation option.
   */
  cancellation?: {
    /**
     * Ask price of contract cancellation option.
     */
    ask_price?: number;
    /**
     * Expiry time in epoch for contract cancellation option.
     */
    date_expiry?: number;
  };
  /**
   * Commission changed in percentage (%).
   */
  commission?: null | number;
  /**
   * Contains contract information.
   */
  contract_details?: {
    /**
     * The markup amount charged on a client's stake amount
     */
    app_markup_amount?: string;
    /**
     * Barrier of the contract.
     */
    barrier?: string;
    /**
     * Absolute difference between high/low barrier and spot
     */
    barrier_spot_distance?: string;
    /**
     * High barrier calculated based on current spot
     */
    high_barrier?: string;
    /**
     * Epoch of last tick considered for stat chart
     */
    last_tick_epoch?: number;
    /**
     * Low barrier calculated based on current spot
     */
    low_barrier?: string;
    /**
     * Maximum payout that user can get out of a contract, contract will close automatically if payout reaches this number
     */
    maximum_payout?: number;
    /**
     * Maximum stake that user can set to buy a contract
     */
    maximum_stake?: string;
    /**
     * Maximum duration that a contract can last, contract will close automatically after this number of ticks
     */
    maximum_ticks?: number;
    /**
     * Minimum stake that user can set to buy a contract
     */
    minimum_stake?: string;
    /**
     * Tick size barrier for Accumulator contracts
     */
    tick_size_barrier?: number;
    /**
     * [Accumulator] Tick size barrier in percentage, rounded off to 5 decimal places
     */
    tick_size_barrier_percentage?: string;
    /**
     * An array of numbers  to build a stat chart - each number represents the duration that spot stayed between barries
     */
    ticks_stayed_in?: number[];
  };
  /**
   * The end date of the contract.
   */
  date_expiry?: number;
  /**
   * The start date of the contract.
   */
  date_start: number;
  /**
   * [Only for vanilla or turbos options] The implied number of contracts
   */
  display_number_of_contracts?: string;
  /**
   * Same as `ask_price`.
   */
  display_value: string;
  /**
   * A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.
   */
  id: string;
  /**
   * Contains limit order information. (Only applicable for contract with limit order).
   */
  limit_order?: {
    /**
     * Contains information where the contract will be closed automatically at the loss specified by the user.
     */
    stop_loss?: {
      /**
       * Localized display name
       */
      display_name?: string;
      /**
       * Stop loss amount for display purpose.
       */
      display_order_amount?: null | string;
      /**
       * Stop loss amount. Will be deprecated soon. Please use [display_order_amount].
       */
      order_amount?: null | number;
      /**
       * Stop loss order epoch
       */
      order_date?: number;
      /**
       * Pip-sized barrier value
       */
      value?: null | string;
    };
    /**
     * Contains information where the contract will be closed automatically when the value of the contract is close to zero. This is set by the us.
     */
    stop_out?: {
      /**
       * Localized display name
       */
      display_name?: string;
      /**
       * Stop out amount for display purpose.
       */
      display_order_amount?: null | string;
      /**
       * Stop out amount. Will be deprecated soon. Please use [display_order_amount].
       */
      order_amount?: null | number;
      /**
       * Stop out order epoch
       */
      order_date?: number;
      /**
       * Pip-sized barrier value
       */
      value?: string;
    };
    /**
     * Contains information where the contract will be closed automatically at the profit specified by the user.
     */
    take_profit?: {
      /**
       * Localized display name
       */
      display_name?: string;
      /**
       * Take profit amount for display purpose.
       */
      display_order_amount?: null | string;
      /**
       * Take profit amount. Will be deprecated soon. Please use [display_order_amount].
       */
      order_amount?: null | number;
      /**
       * Take profit order epoch
       */
      order_date?: number;
      /**
       * Pip-sized barrier value
       */
      value?: null | string;
    };
  };
  /**
   * Example: Win payout if Random 100 Index is strictly higher than entry spot at 15 minutes after contract start time.
   */
  longcode: string;
  /**
   * [Only for vanilla or turbos options] Maximum stakes allowed
   */
  max_stake?: number;
  /**
   * [Only for vanilla or turbos options] Minimum stakes allowed
   */
  min_stake?: number;
  /**
   * [Only for lookback trades] Multiplier applies when calculating the final payoff for each type of lookback. e.g. (Exit spot - Lowest historical price) * multiplier = Payout
   */
  multiplier?: number;
  /**
   * The payout amount of the contract.
   */
  payout: number;
  /**
   * [Only for Turbos] The choices of predefined payout per point for client to choose
   */
  payout_choices?: string[];
  /**
   * Spot value (if there are no Exchange data-feed licensing restrictions for the underlying symbol).
   */
  spot: number;
  /**
   * The corresponding time of the spot value.
   */
  spot_time: number;
  /**
   * Contains contract validation information.
   */
  validation_params?: {
    /**
     * [Only for Accumulators] Maximum payout for the contract.
     */
    max_payout?: string;
    /**
     * [Only for Accumulators] Maximum ticks for the contract.
     */
    max_ticks?: number;
    /**
     * Contains information for minimum and maximum payout amount for the contract.
     */
    payout?: {
      /**
       * Maximum payout allowed
       */
      max?: string;
    };
    /**
     * Contains information for minimum and maximum stake amount for the contract.
     */
    stake?: {
      /**
       * Maximum stake allowed
       */
      max?: string;
      /**
       * Minimum stake allowed
       */
      min?: string;
    };
    /**
     * [Only for Multipliers] Contains information for minimum and maximum stop loss amount for the contract.
     */
    stop_loss?: {
      /**
       * Maximum stop loss amount
       */
      max?: string;
      /**
       * Minimum stop loss amount
       */
      min?: string;
    };
    /**
     * Contains information for minimum and maximum take profit amount for the contract.
     */
    take_profit?: {
      /**
       * Maximum take profit amount
       */
      max?: string;
      /**
       * Minimum take profit amount
       */
      min?: string;
    };
  };
}
/**
 * For subscription requests only.
 */
export interface SubscriptionInformation {
  /**
   * A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.
   */
  id: string;
}
/**
 * Retrieve a summary of account Profit Table, according to given search criteria
 */
export interface ProfitTableRequest {
  /**
   * Must be `1`
   */
  profit_table: 1;
  /**
   * Return only contracts of the specified types
   */
  contract_type?: (
    | "ACCU"
    | "ASIAND"
    | "ASIANU"
    | "CALL"
    | "CALLE"
    | "CALLSPREAD"
    | "DIGITDIFF"
    | "DIGITEVEN"
    | "DIGITMATCH"
    | "DIGITODD"
    | "DIGITOVER"
    | "DIGITUNDER"
    | "EXPIRYMISSE"
    | "EXPIRYMISS"
    | "EXPIRYRANGE"
    | "EXPIRYRANGEE"
    | "LBFLOATCALL"
    | "LBFLOATPUT"
    | "LBHIGHLOW"
    | "MULTDOWN"
    | "MULTUP"
    | "NOTOUCH"
    | "ONETOUCH"
    | "PUT"
    | "PUTE"
    | "PUTSPREAD"
    | "RANGE"
    | "RESETCALL"
    | "RESETPUT"
    | "RUNHIGH"
    | "RUNLOW"
    | "TICKHIGH"
    | "TICKLOW"
    | "UPORDOWN"
    | "VANILLALONGCALL"
    | "VANILLALONGPUT"
    | "TURBOSLONG"
    | "TURBOSSHORT"
  )[];
  /**
   * [Optional] Start date (epoch or YYYY-MM-DD)
   */
  date_from?: string;
  /**
   * [Optional] End date (epoch or YYYY-MM-DD)
   */
  date_to?: string;
  /**
   * [Optional] If set to 1, will return full contracts description.
   */
  description?: 0 | 1;
  /**
   * [Optional] Apply upper limit to count of transactions received.
   */
  limit?: number;
  /**
   * [Optional] Number of transactions to skip.
   */
  offset?: number;
  /**
   * [Optional] Sort direction.
   */
  sort?: "ASC" | "DESC";
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * A summary of account profit table is received
 */
export interface ProfitTableResponse {
  profit_table?: ProfitTable;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "profit_table";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Account Profit Table.
 */
export interface ProfitTable {
  /**
   * Number of transactions returned in this call
   */
  count?: number;
  /**
   * Array of returned transactions
   */
  transactions?: {
    /**
     * ID of the application where this contract was purchased.
     */
    app_id?: number | null;
    /**
     * The buy price
     */
    buy_price?: number;
    /**
     * The unique contract identifier.
     */
    contract_id?: number | null;
    /**
     * [Optional] The contract type for the transaction if description is set to 1.
     */
    contract_type?: string;
    /**
     * [Optional] Duration set for deal cancellation for Multiplier contracts in synthetic indices if description is set to 1.
     */
    deal_cancellation_duration?: string;
    /**
     * [Optional] The duration type of the contract if description is set to 1.
     */
    duration_type?: null | string;
    /**
     * [Optional] The growth rate for Accumulators contract if description is set to 1.
     */
    growth_rate?: string;
    /**
     * [Optional] The description of contract purchased if description is set to 1
     */
    longcode?: string;
    /**
     * [Optional] The multiplier for Multiplier contracts if description is set to 1.
     */
    multiplier?: string;
    /**
     * Payout price
     */
    payout?: number;
    /**
     * Epoch purchase time of the transaction
     */
    purchase_time?: number;
    /**
     * The price the contract sold for.
     */
    sell_price?: number;
    /**
     * Epoch sell time of the transaction
     */
    sell_time?: number | null;
    /**
     * [Optional] Compact description of the contract purchased if description is set to 1
     */
    shortcode?: string;
    /**
     * The transaction Identifier. Every contract (buy or sell) and every payment has a unique transaction identifier.
     */
    transaction_id?: number;
    /**
     * [Optional] Symbol code if description is set to 1
     */
    underlying_symbol?: string;
  }[];
}
/**
 * Receive information about my current portfolio of outstanding options
 */
export interface PortfolioRequest {
  /**
   * Must be `1`
   */
  portfolio: 1;
  /**
   * Return only contracts of the specified types
   */
  contract_type?: (
    | "ACCU"
    | "ASIAND"
    | "ASIANU"
    | "CALL"
    | "CALLE"
    | "CALLSPREAD"
    | "DIGITDIFF"
    | "DIGITEVEN"
    | "DIGITMATCH"
    | "DIGITODD"
    | "DIGITOVER"
    | "DIGITUNDER"
    | "EXPIRYMISSE"
    | "EXPIRYMISS"
    | "EXPIRYRANGE"
    | "EXPIRYRANGEE"
    | "LBFLOATCALL"
    | "LBFLOATPUT"
    | "LBHIGHLOW"
    | "MULTDOWN"
    | "MULTUP"
    | "NOTOUCH"
    | "ONETOUCH"
    | "PUT"
    | "PUTE"
    | "PUTSPREAD"
    | "RANGE"
    | "RESETCALL"
    | "RESETPUT"
    | "RUNHIGH"
    | "RUNLOW"
    | "TICKHIGH"
    | "TICKLOW"
    | "UPORDOWN"
    | "VANILLALONGCALL"
    | "VANILLALONGPUT"
    | "TURBOSLONG"
    | "TURBOSSHORT"
  )[];
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * List of open positions.
 */
export type Contracts = Portfolio1[];

/**
 * Receive a list of outstanding options in the user's portfolio
 */
export interface PortfolioResponse {
  portfolio?: Portfolio;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "portfolio";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Current account's open positions.
 */
export interface Portfolio {
  contracts: Contracts;
}
/**
 * The details of each open position.
 */
export interface Portfolio1 {
  /**
   * ID of the application where this contract was purchased.
   */
  app_id?: number | null;
  /**
   * Buy price
   */
  buy_price?: number;
  /**
   * Internal contract identifier number (to be used in a `proposal_open_contract` API call).
   */
  contract_id?: number;
  /**
   * Contract type
   */
  contract_type?: string;
  /**
   * Contract currency
   */
  currency?: string;
  /**
   * Epoch of start date
   */
  date_start?: number;
  /**
   * Epoch of expiry time
   */
  expiry_time?: number;
  /**
   * Contract description
   */
  longcode?: string;
  /**
   * Payout price
   */
  payout?: number;
  /**
   * Epoch of purchase time
   */
  purchase_time?: number;
  /**
   * Contract short code description
   */
  shortcode?: string;
  /**
   * Symbol code
   */
  symbol?: string;
  /**
   * It is the transaction ID. Every contract (buy or sell) and every payment has a unique ID.
   */
  transaction_id?: number;
}
/**
 * To send the ping request to the server. Mostly used to test the connection or to keep it alive.
 */
export interface PingRequest {
  /**
   * Must be `1`
   */
  ping: 1;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Will return 'pong'
 */
export type Ping = "pong";

/**
 * The response of ping request.
 */
export interface PingResponse {
  ping?: Ping;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "ping";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Retrieve a list of available option payout currencies. If a user is logged in, only the currencies available for the account will be returned.
 */
export interface PayoutCurrenciesRequest {
  /**
   * Must be `1`
   */
  payout_currencies: 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Available payout currencies. Note: if a user is logged in, only the currency available for the account will be returned.
 */
export type PayoutCurrencies = string[];

/**
 * List of available payout currencies.
 */
export interface PayoutCurrenciesResponse {
  payout_currencies?: PayoutCurrencies;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "payout_currencies";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Provide justification to perform withdrawal using a Payment Agent.
 */
export interface PaymentAgentWithdrawJustificationRequest {
  /**
   * Must be `1`
   */
  paymentagent_withdraw_justification: 1;
  /**
   * Reasons for needing to withdraw using a Payment Agent.
   */
  message?: string;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * The result of payment agent withdrawal justification request made.
 */
export interface PaymentAgentWithdrawJustificationResponse {
  /**
   * 1 on success
   */
  paymentagent_withdraw_justification?: number;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "paymentagent_withdraw_justification";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Initiate a withdrawal to an approved Payment Agent.
 */
export interface PaymentAgentWithdrawRequest {
  /**
   * Must be `1`
   */
  paymentagent_withdraw: 1;
  /**
   * The amount to withdraw to the payment agent.
   */
  amount: number;
  /**
   * The currency code.
   */
  currency: string;
  /**
   * [Optional] Remarks about the withdraw. Only letters, numbers, space, period, comma, - ' are allowed.
   */
  description?: string;
  /**
   * [Optional] If set to 1, just do validation.
   */
  dry_run?: 0 | 1;
  /**
   * The payment agent loginid received from the `paymentagent_list` call.
   */
  paymentagent_loginid: string;
  /**
   * Email verification code (received from a `verify_email` call, which must be done first)
   */
  verification_code: string;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * If set to `1`, withdrawal success. If set to `2`, dry-run success.
 */
export type PaymentagentWithdraw = 1 | 2;

/**
 * The result of payment agent withdrawal request made.
 */
export interface PaymentAgentWithdrawResponse {
  paymentagent_withdraw?: PaymentagentWithdraw;
  /**
   * Payment agent name.
   */
  paymentagent_name?: string;
  /**
   * Reference ID of withdrawal performed.
   */
  transaction_id?: number;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "paymentagent_withdraw";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Payment Agent Transfer - this call is available only to accounts that are approved Payment Agents.
 */
export interface PaymentAgentTransferRequest {
  /**
   * Must be `1`
   */
  paymentagent_transfer: 1;
  /**
   * The amount to transfer.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * [Optional] Remarks about the transfer.
   */
  description?: string;
  /**
   * [Optional] If set to `1`, just do validation.
   */
  dry_run?: 0 | 1;
  /**
   * The loginid of the recipient account.
   */
  transfer_to: string;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * If set to `1`, transfer success. If set to `2`, dry-run success.
 */
export type PaymentagentTransfer = 1 | 2;

/**
 * The result of transfer request made.
 */
export interface PaymentAgentTransferResponse {
  paymentagent_transfer?: PaymentagentTransfer;
  /**
   * The `transfer_to` client full name
   */
  client_to_full_name?: string;
  /**
   * The `transfer_to` client loginid
   */
  client_to_loginid?: string;
  /**
   * Reference ID of transfer performed
   */
  transaction_id?: number;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "paymentagent_transfer";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Client's 2-letter country code (obtained from `residence_list` call).
 */
export type PaymentAgentTargetCountry = string;

/**
 * Will return a list of Payment Agents for a given country for a given currency. Payment agents allow users to deposit and withdraw funds using local payment methods that might not be available via the main website's cashier system.
 */
export interface PaymentAgentListRequest {
  paymentagent_list: PaymentAgentTargetCountry;
  /**
   * [Optional] If specified, only payment agents that supports that currency will be returned (obtained from `payout_currencies` call).
   */
  currency?: string;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * A message with Payment Agent List
 */
export interface PaymentAgentListResponse {
  paymentagent_list?: PaymentagentList;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "paymentagent_list";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Payment Agent List
 */
export interface PaymentagentList {
  /**
   * The list of countries in which payment agent is available.
   */
  available_countries?: (null | string)[][];
  /**
   * List of payment agents available in the requested country.
   */
  list: {
    /**
     * Currencies that are accepted by this payment agent.
     */
    currencies: string;
    /**
     * Commission amount applied on deposits made through this payment agent.
     */
    deposit_commission: string;
    /**
     * Payment agent's email address.
     */
    email: string;
    /**
     * More descriptions about this payment agent.
     */
    further_information: string;
    /**
     * Maximum withdrawal allowed for transactions through this payment agent.
     */
    max_withdrawal: null | string;
    /**
     * Minimum withdrawal allowed for transactions through this payment agent.
     */
    min_withdrawal: null | string;
    /**
     * Payment agent's name.
     */
    name: string;
    /**
     * Payment agent's loginid.
     */
    paymentagent_loginid: string;
    /**
     * Payment agent's phone number(s) with country code.
     */
    phone_numbers: {
      /**
       * A phone number
       */
      phone_number?: string;
    }[];
    /**
     * A summary about payment agent.
     */
    summary: string;
    /**
     * A list of supported payment methods.
     */
    supported_payment_methods: {
      /**
       * A payment method's name
       */
      payment_method?: string;
    }[];
    /**
     * The URL(s) of payment agent's website(s).
     */
    urls: {
      /**
       * A webpage or website's URL.
       */
      url?: string;
    }[];
    /**
     * Commission amount applied on withdrawals made through this payment agent.
     */
    withdrawal_commission: string;
  }[];
}
/**
 * Gets client's payment agent details.
 */
export interface PaymentAgentDetailsRequest {
  /**
   * Must be 1
   */
  paymentagent_details: 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Gets client's payment agent details.
 */
export interface PaymentAgentDetailsResponse {
  /**
   * The payment agent details.
   */
  paymentagent_details?: {
    /**
     * Client's My Affiliate id, if exists.
     */
    affiliate_id?: null | string;
    /**
     * If 1, the client may apply using paymentagent_create.
     */
    can_apply: 0 | 1;
    /**
     * Indicates client's agreement with the Code of Conduct document.
     */
    code_of_conduct_approval?: 0 | 1;
    /**
     * Commission (%) the agent want to take on deposits
     */
    commission_deposit?: number;
    /**
     * Commission (%) the agent want to take on withdrawals
     */
    commission_withdrawal?: number;
    /**
     * Currency supported by the payment agent. It's usually the same as agent's Deriv account currency.
     */
    currency_code?: string;
    /**
     * Contains a list of error codes that would prevent a successful payment agent application.
     */
    eligibilty_validation?: string[];
    /**
     * Payment agent's email address.
     */
    email?: string;
    /**
     * Information about payment agent and their proposed service.
     */
    information?: string;
    /**
     * Maximum amount allowed for withdrawals
     */
    max_withdrawal?: number;
    /**
     * Minimum amount allowed for withdrawals
     */
    min_withdrawal?: number;
    /**
     * Indicates if the payment agent was recently approved with no transactions yet.
     */
    newly_authorized?: 0 | 1;
    /**
     * The name with which the payment agent is going to be identified.
     */
    payment_agent_name?: string;
    /**
     * Payment agent's phone number(s) with country code.
     */
    phone_numbers?: {
      /**
       * A phone number.
       */
      phone_number?: string;
    }[];
    /**
     * Indicates the status of the Payment Agent.
     */
    status?: ("applied" | "verified" | "authorized" | "rejected" | "suspended") | null;
    /**
     * A list of supported payment methods.
     */
    supported_payment_methods?: {
      /**
       * A payment method's name
       */
      payment_method?: string;
    }[];
    /**
     * Client's target country.
     */
    target_country?: string;
    /**
     * The URL(s) of payment agent's website(s).
     */
    urls?: {
      /**
       * A website url.
       */
      url?: string;
    }[];
  };
  /**
   * Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "paymentagent_details";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Saves client's payment agent details.
 */
export interface PaymentAgentCreateRequest {
  /**
   * Must be 1
   */
  paymentagent_create: 1;
  /**
   * [Optional] Client's My Affiliate id, if exists.
   */
  affiliate_id?: string;
  /**
   * Indicates client's agreement with the Code of Conduct.
   */
  code_of_conduct_approval: 1;
  /**
   * Commission  (%) the agent wants to take on deposits
   */
  commission_deposit: number;
  /**
   * Commission  (%) the agent wants to take on withdrawals
   */
  commission_withdrawal: number;
  /**
   * Payment agent's email address.
   */
  email: string;
  /**
   * [Optional] Information about payment agent and their proposed service.
   */
  information: string;
  /**
   * The name with which the payment agent is going to be identified.
   */
  payment_agent_name: string;
  /**
   * Payment agent's phone number(s) with country code.
   */
  phone_numbers?: {
    /**
     * A phone number
     */
    phone_number: string;
  }[];
  /**
   * A list of supported payment methods.
   */
  supported_payment_methods: {
    /**
     * A payment method's name
     */
    payment_method: string;
  }[];
  /**
   * The URL(s) of payment agent's website(s).
   */
  urls: {
    /**
     * A webpage or website's URL.
     */
    url: string;
  }[];
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Sets client's payment agent details.
 */
export interface PaymentAgentCreateResponse {
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "paymentagent_create";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Will return a list payment methods available for the given country. If the request is authenticated the client's residence country will be used.
 */
export interface PaymentMethodsRequest {
  /**
   * Must be `1`
   */
  payment_methods: 1;
  /**
   * [Optional] 2-letter country code (ISO standard).
   */
  country?: string;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Maximum amount for deposits for this currency.
 */
export type Max = number;
/**
 * Minimum amount for deposit for this currency.
 */
export type Min = number;
/**
 * How much time it takes for a deposit to be processed.
 */
export type DepositTime = string;
/**
 * Short description explaining the payment method.
 */
export type Description = string;
/**
 * Common name for the payment method.
 */
export type DisplayName = string;
/**
 * Unique identifier for the payment method.
 */
export type Id = string;
/**
 * Payment processor for this payment method.
 */
export type Type = string;
/**
 * A list of predefined amounts for withdraw or deposit.
 */
export type ThePredefinedAmountsSchema = number[];
/**
 * Sign up link for this payment method.
 */
export type SignupLink = string;
/**
 * Currencies supported for this payment method.
 */
export type SupportedCurrencies = string[];
/**
 * Type of Payment Method.
 */
export type Type1 = string;
/**
 * A printable description for type of payment method.
 */
export type TypeDisplayName = string;
/**
 * Maximum amount for wihdrawals in this currency.
 */
export type Max1 = number;
/**
 * Minimum amount for withdrawals in this currency.
 */
export type Min1 = number;
/**
 * How much time takes a withdrawal to be processed.
 */
export type WithdrawalTime = string;
/**
 * Available payment methods for a given country. Note: if a user is logged in, the residence country will be considered.
 */
export type PaymentMethods = ThePaymentMethodSchema[];

/**
 * List of available payment methods for a given country.
 */
export interface PaymentMethodsResponse {
  payment_methods?: PaymentMethods;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "payment_methods";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * A payment method suported for the given country
 */
export interface ThePaymentMethodSchema {
  deposit_limits: DepositLimits;
  deposit_time: DepositTime;
  description: Description;
  display_name: DisplayName;
  id: Id;
  payment_processor: Type;
  predefined_amounts: ThePredefinedAmountsSchema;
  signup_link: SignupLink;
  supported_currencies: SupportedCurrencies;
  type: Type1;
  type_display_name: TypeDisplayName;
  withdraw_limits: WithdrawLimits;
  withdrawal_time: WithdrawalTime;
}
/**
 * The min and max values for deposits.
 */
export interface DepositLimits {
  [k: string]: CurrencyLimits;
}
/**
 * Deposit limits for this method.
 *
 * This interface was referenced by `DepositLimits`'s JSON-Schema definition
 * via the `patternProperty` "^[A-Z]{3}$".
 */
export interface CurrencyLimits {
  max: Max;
  min: Min;
}
/**
 * Withdrawal limits per currency.
 */
export interface WithdrawLimits {
  [k: string]: CurrencyLimits1;
}
/**
 * Withdrawal limits for this currency.
 *
 * This interface was referenced by `WithdrawLimits`'s JSON-Schema definition
 * via the `patternProperty` "^[A-Z]{3}$".
 */
export interface CurrencyLimits1 {
  max: Max1;
  min: Min1;
}
/**
 * A message with Partner Settings
 */
export interface SetPartnerAccountSettingsRequest {
  /**
   * Must be `1`
   */
  partner_settings_update: 1;
  /**
   * [Optional] Company name. Only applicable for partners of type company.
   */
  company_name?: string;
  /**
   * [Optional] Company registration number. Only applicable for partners of type company.
   */
  company_registration_no?: string;
  /**
   * Defines whether this partner is an individual or a company.
   */
  partner_type?: "individual" | "company";
  /**
   * Partner's Website URI/Promotional Platform
   */
  website?: string;
  /**
   * [Optional] The login id of the partner account. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * 1 on success
 */
export type PartnerSettingsUpdate = number;

/**
 * A message with Partner Settings
 */
export interface SetPartnerAccountSettingsResponse {
  partner_settings_update?: PartnerSettingsUpdate;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "partner_settings_update";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Get Partner Settings (Partner Type, Company Details etc)
 */
export interface GetPartnerSpecificAccountSettingsRequest {
  /**
   * Must be `1`
   */
  partner_settings: 1;
  /**
   * [Optional] The login id of the partner account. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Get Partner Settings (Partner Type, Company Details etc)
 */
export interface GetPartnerSpecificAccountSettingsResponse {
  partner_settings?: PartnerSettings;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "partner_settings";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Partner-specific information and settings.
 */
export interface PartnerSettings {
  /**
   * [Optional] Company name. Only applicable for partners of type company.
   */
  company_name?: string;
  /**
   * [Optional] Company registration number. Only applicable for partners of type company.
   */
  company_registration_number?: string;
  /**
   * Defines whether this partner is an individual or a company.
   */
  partner_type?: "individual" | "company";
  /**
   * Platform URL for Dynamic works dashboard to be redirected from Partners Hub which will be set in BackOffice.
   */
  platform_URL?: string;
  /**
   * Defines the provider platform.
   */
  provider?: "myaffiliate" | "dynamicworks";
  /**
   * Partner's Website URI/Promotional Platform
   */
  website?: string;
}
/**
 * Get All Partner Accounts (Partner account details like website, provider, company details)
 */
export interface GetPartnerAccountDetailsRequest {
  /**
   * Must be `1`
   */
  partner_accounts: 1;
  /**
   * [Optional] The login id of the partner account. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Get All Partner Accounts (Partner account details like website, provider, company details)
 */
export interface GetPartnerAccountDetailsResponse {
  partner_accounts?: PartnerAccounts;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "partner_accounts";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Partner Accounts against a user
 */
export interface PartnerAccounts {
  /**
   * List of partner_settigns for all accounts associated as partners.
   */
  partner_settings?: {
    /**
     * The user id.
     */
    binary_user_id?: number;
    /**
     * [Optional] Company name. Only applicable for partners of type company.
     */
    company_name?: string;
    /**
     * [Optional] Company registration number. Only applicable for partners of type company.
     */
    company_registration_no?: string;
    /**
     * Partner's login ID
     */
    partner_loginid?: string;
    /**
     * Defines whether this partner is an individual or a company.
     */
    partner_type?: "individual" | "company";
    /**
     * Defines the provider platform.
     */
    provider?: "myaffiliate" | "dynamicworks";
    /**
     * Partner's Website URI/Promotional Platform
     */
    website?: string;
  }[];
  /**
   * Platform URL for Dynamic works dashboard to be redirected from Partners Hub which will be set in BackOffice.
   */
  platform_url?: {
    /**
     * Partner's provider as key and platform URL as value
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[a-zA-Z_]+$".
     */
    [k: string]: string;
  };
}
/**
 * Request P2P Settings information.
 */
export interface P2PSettingsRequest {
  /**
   * Must be `1`
   */
  p2p_settings: 1;
  /**
   * [Optional] If set to `1`, will send updates whenever there is an update to P2P settings.
   */
  subscribe?: 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Information of the P2P settings.
 */
export interface P2PSettingsResponse {
  p2p_settings?: P2PSettings;
  subscription?: SubscriptionInformation;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "p2p_settings";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Peer-to-peer payment system settings.
 */
export interface P2PSettings {
  /**
   * Maximum number of active ads allowed by an advertiser per currency pair and advert type (buy or sell).
   */
  adverts_active_limit: number;
  /**
   * Adverts will be deactivated if no activity occurs within this period, in days.
   */
  adverts_archive_period?: number;
  /**
   * Block trading settings
   */
  block_trade: {
    /**
     * When 1, Block trading is unavailable.
     */
    disabled?: 0 | 1;
    /**
     * Maximum amount of a block trade advert, in USD.
     */
    maximum_advert_amount?: number;
  };
  /**
   * Advertiser schedule start and end times must be exact multiples of this value, unless it is zero.
   */
  business_hours_minutes_interval: number;
  /**
   * A buyer will be blocked for this duration after exceeding the cancellation limit, in hours.
   */
  cancellation_block_duration: number;
  /**
   * The period within which to count buyer cancellations, in hours.
   */
  cancellation_count_period: number;
  /**
   * A buyer may cancel an order within this period without negative consequences, in minutes after order creation.
   */
  cancellation_grace_period: number;
  /**
   * A buyer will be temporarily barred after marking this number of cancellations within cancellation_period.
   */
  cancellation_limit: number;
  /**
   * Recommended step values for choosing advert counterparty terms.
   */
  counterparty_term_steps?: {
    /**
     * Values for minimum 30 day completion rate.
     */
    completion_rate: number[];
    /**
     * Values for minimum joined days.
     */
    join_days: number[];
    /**
     * Values for minimum average rating.
     */
    rating: number[];
  };
  /**
   * When 0, only exchanges in local currency are allowed for P2P advertiser.
   */
  cross_border_ads_enabled: 0 | 1;
  /**
   * When 1, the P2P service is unavailable.
   */
  disabled: 0 | 1;
  /**
   * Indicates the availbility of certain backend features.
   */
  feature_level: number;
  /**
   * Availability of fixed rate adverts.
   */
  fixed_rate_adverts: "disabled" | "enabled" | "list_only";
  /**
   * Date on which fixed rate adverts will be deactivated.
   */
  fixed_rate_adverts_end_date?: string;
  /**
   * Availability of floating rate adverts.
   */
  float_rate_adverts: "disabled" | "enabled" | "list_only";
  /**
   * Maximum rate offset for floating rate adverts.
   */
  float_rate_offset_limit: number;
  /**
   * Available local currencies for p2p_advert_list request.
   */
  local_currencies: {
    /**
     * Local currency name
     */
    display_name: string;
    /**
     * Indicates that there are adverts available for this currency.
     */
    has_adverts: 0 | 1;
    /**
     * Indicates that this is local currency for the current country.
     */
    is_default?: 1;
    /**
     * Local currency symbol
     */
    symbol: string;
  }[];
  /**
   * Maximum amount of an advert, in USD.
   */
  maximum_advert_amount: number;
  /**
   * Maximum amount of an order, in USD.
   */
  maximum_order_amount: number;
  /**
   * Maximum number of orders a user may create per day.
   */
  order_daily_limit: number;
  /**
   * List of order expiry values available for adverts, in seconds.
   */
  order_expiry_options: number[];
  /**
   * Time allowed for order payment, in minutes after order creation.
   */
  order_payment_period: number;
  /**
   * Local P2P exchange rate which should be used instead of those obtained from the `exchange_rates` call.
   */
  override_exchange_rate?: string;
  /**
   * Indicates if the payment methods feature is enabled.
   */
  payment_methods_enabled: 0 | 1;
  /**
   * Indicates if phone number verification is required to become a P2P advertiser.
   */
  pnv_required: 0 | 1;
  /**
   * Indicates if proof of address is required to become a P2P advertiser.
   */
  poa_required: 0 | 1;
  /**
   * Time after successful order completion during which reviews can be created, in hours.
   */
  review_period: number;
  /**
   * List of currencies for which P2P is available
   */
  supported_currencies: string[];
}
/**
 * For subscription requests only.
 */
export interface SubscriptionInformation {
  /**
   * A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.
   */
  id: string;
}
/**
 * Keeps the connection alive and updates the P2P advertiser's online status. The advertiser will be considered offline 60 seconds after a call is made.
 */
export interface P2PPingRequest {
  /**
   * Must be `1`
   */
  p2p_ping: 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * The response of P2P ping request.
 */
export interface P2PPingResponse {
  /**
   * Will return 'pong'
   */
  p2p_ping?: "pong";
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "p2p_ping";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * List all P2P payment methods.
 */
export interface P2PPaymentMethodsRequest {
  /**
   * Must be 1
   */
  p2p_payment_methods: 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * List all P2P payment methods.
 */
export interface P2PPaymentMethodsResponse {
  /**
   * Payment methods keyed by identifier.
   */
  p2p_payment_methods?: {
    /**
     * Payment method identifier.
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[a-z0-9_]{1,30}$".
     */
    [k: string]: {
      /**
       * Display name of payment method.
       */
      display_name: string;
      /**
       * Payment method field definitions.
       */
      fields: {
        /**
         * Field identifier.
         *
         * This interface was referenced by `undefined`'s JSON-Schema definition
         * via the `patternProperty` "^[a-z0-9_]{1,30}$".
         */
        [k: string]: {
          /**
           * Display name of payment method field.
           */
          display_name: string;
          /**
           * Is field required or optional.
           */
          required: number;
          /**
           * Field type.
           */
          type: "text" | "memo";
        };
      };
      /**
       * Payment method type.
       */
      type: "bank" | "ewallet" | "other";
    };
  };
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "p2p_payment_methods";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Creates a review for the specified order.
 */
export interface P2POrderReviewRequest {
  /**
   * Must be 1
   */
  p2p_order_review: 1;
  /**
   * The order identification number.
   */
  order_id: string;
  /**
   * Rating for the transaction, 1 to 5.
   */
  rating: number;
  /**
   * [Optional] `1` if the counterparty is recommendable to others, otherwise `0`.
   */
  recommended?: null | 0 | 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Response for creating a P2P order review.
 */
export interface P2POrderReviewResponse {
  p2p_order_review?: P2POrderReview;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "p2p_order_review";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Details of the created order review.
 */
export interface P2POrderReview {
  /**
   * The reviewed advertiser's identification number.
   */
  advertiser_id: string;
  /**
   * The epoch time of the review.
   */
  created_time: number;
  /**
   * The order identification number.
   */
  order_id: string;
  /**
   * Rating for the transaction, 1 to 5.
   */
  rating: number;
  /**
   * `1` if the advertiser is recommended, `0` if not recommended.
   */
  recommended: null | 0 | 1;
}
/**
 * List active orders.
 */
export interface P2POrderListRequest {
  /**
   * Must be 1
   */
  p2p_order_list: 1;
  /**
   * [Optional] Should be 1 to list active, 0 to list inactive (historical).
   */
  active?: 0 | 1;
  /**
   * [Optional] If present, lists orders applying to a specific advert.
   */
  advert_id?: string;
  /**
   * [Optional] Filter the orders created after this date(included) format(epoch or YYYY-MM-DD)
   */
  date_from?: string;
  /**
   * [Optional] Filter the orders created before this date(included) format(epoch or YYYY-MM-DD)
   */
  date_to?: string;
  /**
   * [Optional] Used for paging.
   */
  limit?: number;
  /**
   * [Optional] Used for paging.
   */
  offset?: number;
  /**
   * [Optional] If set to 1, will send updates whenever there is a change to any order belonging to you.
   */
  subscribe?: 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * All orders matching the requested criteria.
 */
export interface P2POrderListResponse {
  p2p_order_list?: P2POrderList;
  subscription?: SubscriptionInformation;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "p2p_order_list";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * List of P2P orders.
 */
export interface P2POrderList {
  /**
   * List of orders.
   */
  list: {
    /**
     * The currency to be bought or sold.
     */
    account_currency: string;
    advert_details: AdvertDetails;
    advertiser_details: AdvertiserDetails;
    /**
     * The amount of the order.
     */
    amount: number;
    /**
     * The amount of the order, formatted to appropriate decimal places.
     */
    amount_display: string;
    /**
     * The URL to be used to initialise the chat for this order.
     */
    chat_channel_url: string;
    client_details?: ClientDetails;
    /**
     * The epoch time of the order completion.
     */
    completion_time?: number;
    /**
     * Seller contact information.
     */
    contact_info: string;
    /**
     * The epoch time of the order creation.
     */
    created_time: number;
    dispute_details: DisputeDetails;
    /**
     * The epoch time in which the order will be expired.
     */
    expiry_time: number;
    /**
     * The unique identifier for this order.
     */
    id: string;
    /**
     * `1` if the order is created for the advert of the current client, otherwise `0`.
     */
    is_incoming: 0 | 1;
    /**
     * `1` if a review can be given, otherwise `0`.
     */
    is_reviewable: 0 | 1;
    /**
     * `1` if the latest order changes have been seen by the current client, otherwise `0`.
     */
    is_seen?: 1 | 0;
    /**
     * Local currency for this order.
     */
    local_currency: string;
    /**
     * Payment instructions.
     */
    payment_info: string;
    /**
     * Supported payment methods. Comma separated list of identifiers.
     */
    payment_method?: null | string;
    /**
     * Names of supported payment methods.
     */
    payment_method_names?: string[];
    /**
     * Cost in local currency.
     */
    price: number;
    /**
     * Cost in local currency, formatted to appropriate decimal places.
     */
    price_display: string;
    /**
     * Conversion rate of the order.
     */
    rate: number;
    /**
     * Conversion rate of the order, formatted to appropriate decimal places.
     */
    rate_display: string;
    review_details?: ReviewDetails;
    /**
     * Current order status.
     */
    status:
      | "pending"
      | "buyer-confirmed"
      | "cancelled"
      | "timed-out"
      | "blocked"
      | "refunded"
      | "completed"
      | "disputed"
      | "dispute-refunded"
      | "dispute-completed";
    /**
     * Whether this is a buy or a sell.
     */
    type: "buy" | "sell";
    /**
     * If blocked for too many failed verification attempts, the epoch time that the block will end.
     */
    verification_lockout_until?: number;
    /**
     * If a verification request has already been made, the epoch time that another verification request can be made.
     */
    verification_next_request?: number;
    /**
     * Indicates that the seller in the process of confirming the order.
     */
    verification_pending?: 0 | 1;
    /**
     * Epoch time that the current verification token will expire.
     */
    verification_token_expiry?: number;
  }[];
}
/**
 * Details of the advert for this order.
 */
export interface AdvertDetails {
  /**
   * Indicates if this is block trade advert or not.
   */
  block_trade: 0 | 1;
  /**
   * General information about the advert.
   */
  description: string;
  /**
   * The unique identifier for the advert.
   */
  id: string;
  /**
   * The payment method.
   */
  payment_method: null | string;
  /**
   * Type of the advert.
   */
  type: "buy" | "sell";
}
/**
 * Details of the advertiser for this order.
 */
export interface AdvertiserDetails {
  /**
   * The advertiser's first name.
   */
  first_name?: string;
  /**
   * The advertiser's unique identifier.
   */
  id: string;
  /**
   * Indicates if the advertiser is currently online.
   */
  is_online: 0 | 1;
  /**
   * Indicates that the advertiser was recommended in the most recent review by the current user.
   */
  is_recommended?: null | 0 | 1;
  /**
   * The advertiser's last name.
   */
  last_name?: string;
  /**
   * Epoch of the latest time the advertiser was online, up to 6 months.
   */
  last_online_time: number | null;
  /**
   * The advertiser's account identifier.
   */
  loginid: string;
  /**
   * The advertiser's displayed name.
   */
  name: string;
}
/**
 * Details of the client who created the order.
 */
export interface ClientDetails {
  /**
   * The client's first name.
   */
  first_name?: string;
  /**
   * The client's unique P2P identifier.
   */
  id: string;
  /**
   * Indicates if the advertiser is currently online.
   */
  is_online: 0 | 1;
  /**
   * Indicates that the client was recommended in the most recent review by the current user.
   */
  is_recommended?: null | 0 | 1;
  /**
   * The client's last name.
   */
  last_name?: string;
  /**
   * Epoch of the latest time the advertiser was online, up to 6 months.
   */
  last_online_time: number | null;
  /**
   * The client's account identifier.
   */
  loginid: string;
  /**
   * The client's displayed name.
   */
  name: string;
}
/**
 * Details of the order dispute.
 */
export interface DisputeDetails {
  /**
   * The dispute reason
   */
  dispute_reason: null | string;
  /**
   * The loginid of the client who's raising the dispute
   */
  disputer_loginid: null | string;
}
/**
 * Details of the review you gave for this order, if any.
 */
export interface ReviewDetails {
  /**
   * The epoch time of the review.
   */
  created_time: number;
  /**
   * Rating for the transaction, 1 to 5.
   */
  rating: number;
  /**
   * `1` if the advertiser is recommended, `0` if not recommended.
   */
  recommended: null | 0 | 1;
}
/**
 * For subscription requests only.
 */
export interface SubscriptionInformation {
  /**
   * A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.
   */
  id: string;
}
/**
 * Retrieves the information about a P2P order.
 */
export interface P2POrderInformationRequest {
  /**
   * Must be 1
   */
  p2p_order_info: 1;
  /**
   * The unique identifier for the order.
   */
  id: string;
  /**
   * [Optional] If set to 1, will send updates whenever there is an update to order
   */
  subscribe?: 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Information of the P2P order.
 */
export interface P2POrderInformationResponse {
  p2p_order_info?: P2POrderInfo;
  subscription?: SubscriptionInformation;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "p2p_order_info";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * The information of P2P order.
 */
export interface P2POrderInfo {
  /**
   * The currency of order.
   */
  account_currency: string;
  advert_details: AdvertDetails;
  advertiser_details: AdvertiserDetails;
  /**
   * The amount of the order.
   */
  amount: number;
  /**
   * The amount of the order, formatted to appropriate decimal places.
   */
  amount_display: string;
  /**
   * The URL to be used to initialise the chat for this order.
   */
  chat_channel_url: string;
  client_details: ClientDetails;
  /**
   * The epoch time of the order completion.
   */
  completion_time?: number;
  /**
   * Seller contact information.
   */
  contact_info: string;
  /**
   * The epoch time of the order creation.
   */
  created_time: number;
  dispute_details: DisputeDetails;
  /**
   * The epoch time in which the order will be expired.
   */
  expiry_time: number;
  /**
   * The unique identifier for this order.
   */
  id: string;
  /**
   * `1` if the order is created for the advert of the current client, otherwise `0`.
   */
  is_incoming: 0 | 1;
  /**
   * `1` if a review can be given, otherwise `0`.
   */
  is_reviewable: 0 | 1;
  /**
   * `1` if the latest order changes have been seen by the current client, otherwise `0`.
   */
  is_seen?: 1 | 0;
  /**
   * Local currency for this order.
   */
  local_currency: string;
  /**
   * Payment instructions.
   */
  payment_info: string;
  /**
   * Supported payment methods. Comma separated list.
   */
  payment_method?: null | string;
  /**
   * Details of available payment methods.
   */
  payment_method_details?: {
    /**
     * Unique identifier.
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[0-9]{1,8}$".
     */
    [k: string]: {
      /**
       * Display name of payment method.
       */
      display_name?: string;
      /**
       * Payment method fields.
       */
      fields: {
        /**
         * Field identifier.
         *
         * This interface was referenced by `undefined`'s JSON-Schema definition
         * via the `patternProperty` "^[a-z0-9_]{1,30}$".
         */
        [k: string]: {
          /**
           * Display name of payment method field.
           */
          display_name: string;
          /**
           * Is field required or optional.
           */
          required: number;
          /**
           * Field type.
           */
          type: "text" | "memo";
          /**
           * Current value of payment method field.
           */
          value: string;
        };
      };
      /**
       * Indicates whether method is enabled.
       */
      is_enabled: 0 | 1;
      /**
       * Payment method identifier.
       */
      method: string;
      /**
       * Payment method type.
       */
      type: "bank" | "ewallet" | "other";
      /**
       * IDs of adverts that use this payment method.
       */
      used_by_adverts?: string[] | null;
      /**
       * IDs of orders that use this payment method.
       */
      used_by_orders?: string[] | null;
    };
  };
  /**
   * Names of supported payment methods.
   */
  payment_method_names?: string[];
  /**
   * Cost in local currency.
   */
  price: number;
  /**
   * Cost in local currency, formatted to appropriate decimal places.
   */
  price_display: string;
  /**
   * Conversion rate of the order.
   */
  rate: number;
  /**
   * Conversion rate of the order, formatted to appropriate decimal places.
   */
  rate_display: string;
  review_details?: ReviewDetails;
  /**
   * Current order status.
   */
  status:
    | "pending"
    | "buyer-confirmed"
    | "cancelled"
    | "timed-out"
    | "blocked"
    | "refunded"
    | "completed"
    | "disputed"
    | "dispute-refunded"
    | "dispute-completed";
  /**
   * Whether this is a buy or a sell.
   */
  type: "buy" | "sell";
  /**
   * If blocked for too many failed verification attempts, the epoch time that the block will end.
   */
  verification_lockout_until?: number;
  /**
   * If a verification request has already been made, the epoch time that another verification request can be made.
   */
  verification_next_request?: number;
  /**
   * Indicates that the seller in the process of confirming the order.
   */
  verification_pending?: 0 | 1;
  /**
   * Epoch time that the current verification token will expire.
   */
  verification_token_expiry?: number;
}
/**
 * Details of the advert for this order.
 */
export interface AdvertDetails {
  /**
   * Indicates if this is block trade advert or not.
   */
  block_trade: 0 | 1;
  /**
   * General information about the advert.
   */
  description: string;
  /**
   * The unique identifier for the advert.
   */
  id: string;
  /**
   * The payment method.
   */
  payment_method: null | string;
  /**
   * Type of the advert.
   */
  type: "buy" | "sell";
}
/**
 * Details of the advertiser for this order.
 */
export interface AdvertiserDetails {
  /**
   * The advertiser's first name.
   */
  first_name?: string;
  /**
   * The advertiser's unique identifier.
   */
  id: string;
  /**
   * Indicates if the advertiser is currently online.
   */
  is_online: 0 | 1;
  /**
   * Indicates that the advertiser was recommended in the most recent review by the current user.
   */
  is_recommended?: null | 0 | 1;
  /**
   * The advertiser's last name.
   */
  last_name?: string;
  /**
   * Epoch of the latest time the advertiser was online, up to 6 months.
   */
  last_online_time: number | null;
  /**
   * The advertiser's account identifier.
   */
  loginid: string;
  /**
   * The advertiser's displayed name.
   */
  name: string;
}
/**
 * Details of the client who created the order.
 */
export interface ClientDetails {
  /**
   * The client's first name.
   */
  first_name?: string;
  /**
   * The client's unique P2P identifier.
   */
  id: string;
  /**
   * Indicates if the advertiser is currently online.
   */
  is_online: 0 | 1;
  /**
   * Indicates that the client was recommended in the most recent review by the current user.
   */
  is_recommended?: null | 0 | 1;
  /**
   * The client's last name.
   */
  last_name?: string;
  /**
   * Epoch of the latest time the advertiser was online, up to 6 months.
   */
  last_online_time: number | null;
  /**
   * The client's account identifier.
   */
  loginid: string;
  /**
   * The client's displayed name.
   */
  name: string;
}
/**
 * Details of the order dispute.
 */
export interface DisputeDetails {
  /**
   * The dispute reason
   */
  dispute_reason: null | string;
  /**
   * The loginid of the client who's raising the dispute
   */
  disputer_loginid: null | string;
}
/**
 * Details of the review you gave for this order, if any.
 */
export interface ReviewDetails {
  /**
   * The epoch time of the review.
   */
  created_time: number;
  /**
   * Rating for the transaction, 1 to 5.
   */
  rating: number;
  /**
   * `1` if the advertiser is recommended, `0` if not recommended.
   */
  recommended: null | 0 | 1;
}
/**
 * For subscription requests only.
 */
export interface SubscriptionInformation {
  /**
   * A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.
   */
  id: string;
}
/**
 * Dispute a P2P order.
 */
export interface P2POrderDisputeRequest {
  /**
   * Must be 1
   */
  p2p_order_dispute: 1;
  /**
   * The predefined dispute reason
   */
  dispute_reason:
    | "seller_not_released"
    | "buyer_underpaid"
    | "buyer_overpaid"
    | "buyer_not_paid"
    | "buyer_third_party_payment_method";
  /**
   * The unique identifier for this order.
   */
  id: string;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Result of the P2P order disputing.
 */
export interface P2POrderDisputeResponse {
  p2p_order_dispute?: P2POrderDispute;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "p2p_order_dispute";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Details of the disputed order.
 */
export interface P2POrderDispute {
  /**
   * The currency of order.
   */
  account_currency: string;
  advert_details: AdvertDetails;
  advertiser_details: AdvertiserDetails;
  /**
   * The amount of the order.
   */
  amount: number;
  /**
   * The amount of the order, formatted to appropriate decimal places.
   */
  amount_display: string;
  /**
   * The URL to be used to initialise the chat for this order.
   */
  chat_channel_url: string;
  client_details: ClientDetails;
  /**
   * Seller contact information.
   */
  contact_info: string;
  /**
   * The epoch time of the order creation.
   */
  created_time: number;
  dispute_details: DisputeDetails;
  /**
   * The epoch time in which the order will be expired.
   */
  expiry_time: number;
  /**
   * The unique identifier for this order.
   */
  id: string;
  /**
   * `1` if the order is created for the advert of the current client, otherwise `0`.
   */
  is_incoming: 0 | 1;
  /**
   * `1` if a review can be given, otherwise `0`.
   */
  is_reviewable: 0 | 1;
  /**
   * `1` if the latest order changes have been seen by the current client, otherwise `0`.
   */
  is_seen: 1 | 0;
  /**
   * Local currency for this order.
   */
  local_currency: string;
  /**
   * Payment instructions.
   */
  payment_info: string;
  /**
   * Cost in local currency.
   */
  price: number;
  /**
   * Cost in local currency, formatted to appropriate decimal places.
   */
  price_display: string;
  /**
   * Conversion rate of the order.
   */
  rate: number;
  /**
   * Conversion rate of the order, formatted to appropriate decimal places.
   */
  rate_display: string;
  /**
   * Current order status.
   */
  status:
    | "pending"
    | "buyer-confirmed"
    | "cancelled"
    | "timed-out"
    | "blocked"
    | "refunded"
    | "completed"
    | "disputed"
    | "dispute-refunded"
    | "dispute-completed";
  /**
   * Whether this is a buy or a sell.
   */
  type: "buy" | "sell";
  /**
   * If blocked for too many failed verification attempts, the epoch time that the block will end.
   */
  verification_lockout_until?: number;
  /**
   * If a verification request has already been made, the epoch time that another verification request can be made.
   */
  verification_next_request?: number;
  /**
   * Indicates that the seller in the process of confirming the order.
   */
  verification_pending?: 0 | 1;
  /**
   * Epoch time that the current verification token will expire.
   */
  verification_token_expiry?: number;
}
/**
 * Details of the advert for this order.
 */
export interface AdvertDetails {
  /**
   * Indicates if this is block trade advert or not.
   */
  block_trade: 0 | 1;
  /**
   * General information about the advert.
   */
  description: string;
  /**
   * The unique identifier for the advert.
   */
  id: string;
  /**
   * The payment method.
   */
  payment_method: null | string;
  /**
   * Type of the advert.
   */
  type: "buy" | "sell";
}
/**
 * Details of the advertiser for this order.
 */
export interface AdvertiserDetails {
  /**
   * The client's first name.
   */
  first_name?: string;
  /**
   * The advertiser's unique identifier.
   */
  id: string;
  /**
   * Indicates if the advertiser is currently online.
   */
  is_online: 0 | 1;
  /**
   * The advertiser's last name.
   */
  last_name?: string;
  /**
   * Epoch of the latest time the advertiser was online, up to 6 months.
   */
  last_online_time: number | null;
  /**
   * The advertiser's account identifier.
   */
  loginid: string;
  /**
   * The advertiser's displayed name.
   */
  name: string;
}
/**
 * Details of the client who created the order.
 */
export interface ClientDetails {
  /**
   * The client's first name.
   */
  first_name?: string;
  /**
   * The client's unique P2P identifier.
   */
  id: string;
  /**
   * Indicates if the advertiser is currently online.
   */
  is_online: 0 | 1;
  /**
   * The client's last name.
   */
  last_name?: string;
  /**
   * Epoch of the latest time the advertiser was online, up to 6 months.
   */
  last_online_time: number | null;
  /**
   * The client's account identifier.
   */
  loginid: string;
  /**
   * The client's displayed name.
   */
  name: string;
}
/**
 * Details of the order dispute.
 */
export interface DisputeDetails {
  /**
   * The dispute reason
   */
  dispute_reason: string | null;
  /**
   * The loginid of the client who's raising the dispute
   */
  disputer_loginid: string | null;
}
/**
 * Creates a P2P order for the specified advert.
 */
export interface P2POrderCreateRequest {
  /**
   * Must be 1
   */
  p2p_order_create: 1;
  /**
   * The unique identifier for the advert to create an order against.
   */
  advert_id: string;
  /**
   * The amount of currency to be bought or sold.
   */
  amount: number;
  /**
   * [Optional] Seller contact information. Only applicable for 'sell orders'.
   */
  contact_info?: string;
  /**
   * [Optional] Payment instructions, only applicable for sell orders.
   */
  payment_info?: string;
  /**
   * IDs of payment methods, only applicable for sell orders.
   *
   * @maxItems 3
   */
  payment_method_ids?: [] | [number] | [number, number] | [number, number, number];
  /**
   * [Optional] Conversion rate from account currency to local currency, only applicable for floating rate adverts.
   */
  rate?: number;
  /**
   * [Optional] If set to 1, will send updates whenever there is an update to the order.
   */
  subscribe?: 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * The information about the created P2P order.
 */
export interface P2POrderCreateResponse {
  p2p_order_create?: P2POrderCreate;
  subscription?: SubscriptionInformation;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "p2p_order_create";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Information of the creates P2P order.
 */
export interface P2POrderCreate {
  /**
   * The currency of order.
   */
  account_currency: string;
  advert_details: AdvertDetails;
  advertiser_details: AdvertiserDetails;
  /**
   * The amount of the order.
   */
  amount: number;
  /**
   * The amount of the order, formatted to appropriate decimal places.
   */
  amount_display: string;
  /**
   * The URL to be used to initialise the chat for this order.
   */
  chat_channel_url: string;
  client_details: ClientDetails;
  /**
   * Seller contact information.
   */
  contact_info: string;
  /**
   * The epoch time of the order creation.
   */
  created_time: number;
  dispute_details: DisputeDetails;
  /**
   * The epoch time in which the order will be expired.
   */
  expiry_time: number;
  /**
   * The unique identifier for this order.
   */
  id: string;
  /**
   * `1` if the order is created for the advert of the current client, otherwise `0`.
   */
  is_incoming: 0 | 1;
  /**
   * `1` if a review can be given, otherwise `0`.
   */
  is_reviewable: 0 | 1;
  /**
   * `1` if the latest order changes have been seen by the current client, otherwise `0`.
   */
  is_seen: 1 | 0;
  /**
   * Local currency for this order.
   */
  local_currency: string;
  /**
   * Payment instructions.
   */
  payment_info: string;
  /**
   * Supported payment methods. Comma separated list.
   */
  payment_method?: null | string;
  /**
   * Details of available payment methods.
   */
  payment_method_details?: {
    /**
     * Unique identifier.
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[0-9]{1,8}$".
     */
    [k: string]: {
      /**
       * Display name of payment method.
       */
      display_name?: string;
      /**
       * Payment method fields.
       */
      fields: {
        /**
         * Field identifier.
         *
         * This interface was referenced by `undefined`'s JSON-Schema definition
         * via the `patternProperty` "^[a-z0-9_]{1,30}$".
         */
        [k: string]: {
          /**
           * Display name of payment method field.
           */
          display_name: string;
          /**
           * Is field required or optional.
           */
          required: number;
          /**
           * Field type.
           */
          type: "text" | "memo";
          /**
           * Current value of payment method field.
           */
          value: string;
        };
      };
      /**
       * Indicates whether method is enabled.
       */
      is_enabled: 0 | 1;
      /**
       * Payment method identifier.
       */
      method: string;
      /**
       * Payment method type.
       */
      type: "bank" | "ewallet" | "other";
      /**
       * IDs of adverts that use this payment method.
       */
      used_by_adverts?: string[] | null;
      /**
       * IDs of orders that use this payment method.
       */
      used_by_orders?: string[] | null;
    };
  };
  /**
   * Cost in local currency.
   */
  price: number;
  /**
   * Cost in local currency, formatted to appropriate decimal places.
   */
  price_display: string;
  /**
   * Conversion rate of the order.
   */
  rate: number;
  /**
   * Conversion rate of the order, formatted to appropriate decimal places.
   */
  rate_display: string;
  /**
   * The status of the created order.
   */
  status: "pending";
  /**
   * Type of the order.
   */
  type: "buy" | "sell";
}
/**
 * Details of the advert for this order.
 */
export interface AdvertDetails {
  /**
   * Indicates if this is block trade advert or not.
   */
  block_trade: 0 | 1;
  /**
   * General information about the advert.
   */
  description: string;
  /**
   * The unique identifier for the advert.
   */
  id: string;
  /**
   * The payment method.
   */
  payment_method: null | string;
  /**
   * Type of the advert.
   */
  type: "buy" | "sell";
}
/**
 * Details of the advertiser for this order.
 */
export interface AdvertiserDetails {
  /**
   * The advertiser's first name.
   */
  first_name?: string;
  /**
   * The advertiser's unique identifier.
   */
  id: string;
  /**
   * Indicates if the advertiser is currently online.
   */
  is_online: 0 | 1;
  /**
   * The advertiser's last name.
   */
  last_name?: string;
  /**
   * Epoch of the latest time the advertiser was online, up to 6 months.
   */
  last_online_time: number | null;
  /**
   * The advertiser's account identifier.
   */
  loginid: string;
  /**
   * The advertiser's displayed name.
   */
  name: string;
}
/**
 * Details of the client who created the order.
 */
export interface ClientDetails {
  /**
   * The client's first name.
   */
  first_name?: string;
  /**
   * The client's unique P2P identifier.
   */
  id: string;
  /**
   * Indicates if the advertiser is currently online.
   */
  is_online: 0 | 1;
  /**
   * The client's last name.
   */
  last_name?: string;
  /**
   * Epoch of the latest time the advertiser was online, up to 6 months.
   */
  last_online_time: number | null;
  /**
   * The client's account identifier.
   */
  loginid: string;
  /**
   * The client's displayed name.
   */
  name: string;
}
/**
 * Details of the order dispute.
 */
export interface DisputeDetails {
  /**
   * The dispute reason
   */
  dispute_reason: null | string;
  /**
   * The loginid of the client who's raising the dispute
   */
  disputer_loginid: null | string;
}
/**
 * For subscription requests only.
 */
export interface SubscriptionInformation {
  /**
   * A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.
   */
  id: string;
}
/**
 * Confirm a P2P order.
 */
export interface P2POrderConfirmRequest {
  /**
   * Must be 1
   */
  p2p_order_confirm: 1;
  /**
   * [Optional] If set to `1`, only validation is performed.
   */
  dry_run?: 0 | 1;
  /**
   * The unique identifier for this order.
   */
  id: string;
  /**
   * [Optional] Verification code received from email.
   */
  verification_code?: string;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Result of the P2P order confirmation.
 */
export interface P2POrderConfirmResponse {
  /**
   * Confirmation details
   */
  p2p_order_confirm?: {
    /**
     * The `dry_run` was successful.
     */
    dry_run?: 1;
    /**
     * The unique identifier for the order.
     */
    id: string;
    /**
     * The new status of the order.
     */
    status?: "buyer-confirmed" | "completed";
  };
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "p2p_order_confirm";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Cancel a P2P order.
 */
export interface P2POrderCancelRequest {
  /**
   * Must be 1
   */
  p2p_order_cancel: 1;
  /**
   * The unique identifier for this order.
   */
  id: string;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Result of the P2P order cancellation.
 */
export interface P2POrderCancelResponse {
  /**
   * Cancellation details
   */
  p2p_order_cancel?: {
    /**
     * The unique identifier for the order.
     */
    id: string;
    /**
     * The new status of the order.
     */
    status: "cancelled";
  };
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "p2p_order_cancel";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * List all or specific country and its payment methods.
 */
export interface P2PCountryListRequest {
  /**
   * Must be 1
   */
  p2p_country_list: 1;
  /**
   * [Optional] 2-letter country code. If not provided all countries are returned.
   */
  country?: string;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * List all or specific country and its payment methods.
 */
export interface P2PCountryListResponse {
  /**
   * Country identified by country code
   */
  p2p_country_list?: {
    [k: string]: unknown;
  };
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "p2p_country_list";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Creates a P2P chat for the specified order.
 */
export interface P2PChatCreateRequest {
  /**
   * Must be 1
   */
  p2p_chat_create: 1;
  /**
   * The unique identifier for the order to create the chat for.
   */
  order_id: string;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Information of the created P2P chat.
 */
export interface P2PChatCreateResponse {
  p2p_chat_create?: P2PChatCreate;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "p2p_chat_create";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Information of the P2P chat.
 */
export interface P2PChatCreate {
  /**
   * The URL to be used to initialise the chat for the requested order.
   */
  channel_url: string;
  /**
   * The unique identifier for the order that the chat belongs to.
   */
  order_id: string;
}
/**
 * Update the information of the P2P advertiser for the current account. Can only be used by an approved P2P advertiser.
 */
export interface P2PAdvertiserUpdateRequest {
  /**
   * Must be 1
   */
  p2p_advertiser_update: 1;
  /**
   * [Optional] Advertiser's contact information, to be used as a default for new sell adverts.
   */
  contact_info?: string;
  /**
   * [Optional] Default description that can be used every time an advert is created.
   */
  default_advert_description?: string;
  /**
   * [Optional] Used to set if the advertiser's adverts could be listed. When `0`, adverts won't be listed regardless of they are active or not. This doesn't change the `is_active` of each individual advert.
   */
  is_listed?: 0 | 1;
  /**
   * [Optional] Advertiser's payment information, to be used as a default for new sell adverts.
   */
  payment_info?: string;
  /**
   * [Optional] Weekly availability schedule. Ads are visible and orders can be created only during available periods.
   *
   * @maxItems 50
   */
  schedule?:
    | {
        /**
         * Minute of week when availablility ends. Zero is Sunday 00:00 UST.
         */
        end_min: number | null;
        /**
         * Minute of week when availablility starts. Zero is Sunday 00:00 UST.
         */
        start_min: number | null;
      }[]
    | null;
  /**
   * [Optional] When `1`, the advertiser's real name will be displayed on to other users on adverts and orders.
   */
  show_name?: 0 | 1;
  /**
   * [Optional] Used to upgrade daily limits of eligible advertiser.
   */
  upgrade_limits?: 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Returns latest information of the advertiser.
 */
export interface P2PAdvertiserUpdateResponse {
  p2p_advertiser_update?: P2PAdvertiserUpdate;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "p2p_advertiser_update";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * P2P advertiser information.
 */
export interface P2PAdvertiserUpdate {
  /**
   * Number of active fixed rate adverts belonging to the advertiser.
   */
  active_fixed_ads?: number;
  /**
   * Number of active floating rate adverts belonging to the advertiser.
   */
  active_float_ads?: number;
  /**
   * Average difference of advert rate compared to the market rate over the past 30 days.
   */
  advert_rates: null | number;
  /**
   * Amount of funds available to sell on P2P. May be less than account balance according to deposit methods used.
   */
  balance_available: number;
  /**
   * Boolean value: 1 or 0, indicating whether the advertiser's identify has been verified.
   */
  basic_verification: 1 | 0;
  /**
   * Block trading limits, if block trading is allowed.
   */
  block_trade?: {
    /**
     * Maximum order amount for block trade adverts.
     */
    max_order_amount: string;
    /**
     * Minimum order amount for block trade adverts.
     */
    min_order_amount: string;
  };
  /**
   * The number of P2P users who have blocked this advertiser.
   */
  blocked_by_count: number;
  /**
   * If a temporary bar was placed, this is the epoch time at which it will end.
   */
  blocked_until?: number;
  /**
   * The percentage of completed orders out of total orders as a buyer within the past 30 days.
   */
  buy_completion_rate: null | number;
  /**
   * Buy order volume in the past 30 days.
   */
  buy_orders_amount: string;
  /**
   * The number of buy order completed within the past 30 days.
   */
  buy_orders_count: number;
  /**
   * The average time in seconds taken to make payment as a buyer within the past 30 days.
   */
  buy_time_avg: number | null;
  /**
   * The average time in seconds taken to cancel orders as a buyer within the past 30 days.
   */
  cancel_time_avg: number | null;
  /**
   * The number of times the user may cancel orders before being temporarily blocked.
   */
  cancels_remaining: number;
  /**
   * The token to be used for authenticating the client for chat.
   */
  chat_token: null | string;
  /**
   * The unique identifier for the chat user.
   */
  chat_user_id: null | string;
  /**
   * Advertiser's contact information.
   */
  contact_info: string;
  /**
   * The epoch time that the client became an advertiser.
   */
  created_time: number;
  /**
   * Total value of P2P buy transactions in the past 24 hours.
   */
  daily_buy?: string;
  /**
   * Maximum allowed value of P2P buy transactions in a 24 hour period.
   */
  daily_buy_limit?: string;
  /**
   * Total value of P2P sell transactions in the past 24 hours.
   */
  daily_sell?: string;
  /**
   * Maximum allowed value of P2P sell transactions in a 24 hour period.
   */
  daily_sell_limit?: string;
  /**
   * Default description that can be used every time an advert is created.
   */
  default_advert_description: string;
  /**
   * The advertiser's first name.
   */
  first_name?: string;
  /**
   * Boolean value: 1 or 0, indicating whether the advertiser's address has been verified.
   */
  full_verification: 1 | 0;
  /**
   * The advertiser's identification number.
   */
  id: string;
  /**
   * The approval status of the advertiser.
   */
  is_approved: 0 | 1;
  /**
   * Indicates if the advertiser's active adverts are listed. When `0`, adverts won't be listed regardless if they are active or not.
   */
  is_listed: 0 | 1;
  /**
   * Indicates if the advertiser is currently online.
   */
  is_online: 0 | 1;
  /**
   * Inidcates whether the advertiser's schedule allows P2P transactions at the current time.
   */
  is_schedule_available: 0 | 1;
  /**
   * The advertiser's last name.
   */
  last_name?: string;
  /**
   * Epoch of the latest time the advertiser was online, up to 6 months.
   */
  last_online_time: number | null;
  /**
   * Maximum order amount for adverts.
   */
  max_order_amount?: string;
  /**
   * Sell ads will be hidden when your available balance or remaining daily sell limit falls beneath this value.
   */
  min_balance?: string;
  /**
   * Minimum order amount for adverts.
   */
  min_order_amount?: string;
  /**
   * The advertiser's displayed name.
   */
  name: string;
  /**
   * Number of different users the advertiser has traded with since registration.
   */
  partner_count: number;
  /**
   * Advertiser's payment information.
   */
  payment_info: string;
  /**
   * Average rating of the advertiser, range is 1-5.
   */
  rating_average: null | number;
  /**
   * Number of ratings given to the advertiser.
   */
  rating_count: number;
  /**
   * Percentage of users who have recommended the advertiser.
   */
  recommended_average: null | number;
  /**
   * Number of times the advertiser has been recommended.
   */
  recommended_count: number | null;
  /**
   * The average time in seconds taken to release funds as a seller within the past 30 days.
   */
  release_time_avg: number | null;
  /**
   * [Optional] Weekly availability schedule. Ads are visible and orders can be created only during available periods.
   */
  schedule?:
    | {
        /**
         * Minute of week when availablility ends. Zero is Sunday 00:00 UST.
         */
        end_min: number | null;
        /**
         * Minute of week when availablility starts. Zero is Sunday 00:00 UST.
         */
        start_min: number | null;
      }[]
    | null;
  /**
   * The percentage of completed orders out of total orders as a seller within the past 30 days.
   */
  sell_completion_rate: null | number;
  /**
   * Sell order volume in the past 30 days.
   */
  sell_orders_amount: string;
  /**
   * The number of sell order orders completed within the past 30 days.
   */
  sell_orders_count: number;
  /**
   * When `1`, the advertiser's real name will be displayed on to other users on adverts and orders.
   */
  show_name: 0 | 1;
  /**
   * The percentage of completed orders out of all orders within the past 30 days.
   */
  total_completion_rate: null | number;
  /**
   * The total number of orders completed since advertiser registration.
   */
  total_orders_count: number;
  /**
   * Total order volume since advertiser registration.
   */
  total_turnover: string;
  /**
   * New daily limits available.
   */
  upgradable_daily_limits?: {
    /**
     * When `1`, upgrade will provide block trading.
     */
    block_trade?: 0 | 1;
    /**
     * Upgradable daily buy limit.
     */
    max_daily_buy: string;
    /**
     * Upgradable daily sell limit.
     */
    max_daily_sell: string;
  };
  /**
   * Remaining withdrawal_limit of a non-fully authenticated advertiser.
   */
  withdrawal_limit?: null | string;
}
/**
 * Updates and returns favourite and blocked advertisers of the current user.
 */
export interface P2PAdvertiserRelationsRequest {
  /**
   * Must be 1
   */
  p2p_advertiser_relations: 1;
  /**
   * IDs of advertisers to block.
   *
   * @minItems 1
   * @maxItems 5
   */
  add_blocked?:
    | [number]
    | [number, number]
    | [number, number, number]
    | [number, number, number, number]
    | [number, number, number, number, number];
  /**
   * IDs of advertisers to add as favourites.
   *
   * @minItems 1
   * @maxItems 5
   */
  add_favourites?:
    | [number]
    | [number, number]
    | [number, number, number]
    | [number, number, number, number]
    | [number, number, number, number, number];
  /**
   * IDs of advertisers to remove from blocked.
   *
   * @minItems 1
   * @maxItems 5
   */
  remove_blocked?:
    | [number]
    | [number, number]
    | [number, number, number]
    | [number, number, number, number]
    | [number, number, number, number, number];
  /**
   * IDs of advertisers to remove from favourites.
   *
   * @minItems 1
   * @maxItems 5
   */
  remove_favourites?:
    | [number]
    | [number, number]
    | [number, number, number]
    | [number, number, number, number]
    | [number, number, number, number, number];
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Returns information about favourite and blocked advertisers.
 */
export interface P2PAdvertiserRelationsResponse {
  p2p_advertiser_relations?: P2PAdvertiserRelations;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "p2p_advertiser_relations";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * P2P advertiser relations information.
 */
export interface P2PAdvertiserRelations {
  /**
   * List of advertisers blocked by the current user.
   */
  blocked_advertisers: {
    /**
     * The epoch time that the advertiser was blocked.
     */
    created_time?: number;
    /**
     * Advertiser unique identifer.
     */
    id?: string;
    /**
     * Advertiser displayed name.
     */
    name?: string;
  }[];
  /**
   * Favourite advertisers of the current user.
   */
  favourite_advertisers: {
    /**
     * The epoch time that the advertiser was set as favourite.
     */
    created_time?: number;
    /**
     * Advertiser unique identifer.
     */
    id?: string;
    /**
     * Advertiser displayed name.
     */
    name?: string;
  }[];
}
/**
 * Manage or list P2P advertiser payment methods.
 */
export interface P2PAdvertiserPaymentMethodsRequest {
  /**
   * Must be 1
   */
  p2p_advertiser_payment_methods: 1;
  /**
   * Contains new payment method entries.
   *
   * @minItems 1
   * @maxItems 5
   */
  create?:
    | [
        {
          /**
           * Payment method identifer.
           */
          method: string;
          /**
           * Payment method field value.
           *
           * This interface was referenced by `undefined`'s JSON-Schema definition
           * via the `patternProperty` "^[a-z0-9_]{1,30}$".
           */
          [k: string]: string;
        }
      ]
    | [
        {
          /**
           * Payment method identifer.
           */
          method: string;
          /**
           * Payment method field value.
           *
           * This interface was referenced by `undefined`'s JSON-Schema definition
           * via the `patternProperty` "^[a-z0-9_]{1,30}$".
           */
          [k: string]: string;
        },
        {
          /**
           * Payment method identifer.
           */
          method: string;
          /**
           * Payment method field value.
           *
           * This interface was referenced by `undefined`'s JSON-Schema definition
           * via the `patternProperty` "^[a-z0-9_]{1,30}$".
           */
          [k: string]: string;
        }
      ]
    | [
        {
          /**
           * Payment method identifer.
           */
          method: string;
          /**
           * Payment method field value.
           *
           * This interface was referenced by `undefined`'s JSON-Schema definition
           * via the `patternProperty` "^[a-z0-9_]{1,30}$".
           */
          [k: string]: string;
        },
        {
          /**
           * Payment method identifer.
           */
          method: string;
          /**
           * Payment method field value.
           *
           * This interface was referenced by `undefined`'s JSON-Schema definition
           * via the `patternProperty` "^[a-z0-9_]{1,30}$".
           */
          [k: string]: string;
        },
        {
          /**
           * Payment method identifer.
           */
          method: string;
          /**
           * Payment method field value.
           *
           * This interface was referenced by `undefined`'s JSON-Schema definition
           * via the `patternProperty` "^[a-z0-9_]{1,30}$".
           */
          [k: string]: string;
        }
      ]
    | [
        {
          /**
           * Payment method identifer.
           */
          method: string;
          /**
           * Payment method field value.
           *
           * This interface was referenced by `undefined`'s JSON-Schema definition
           * via the `patternProperty` "^[a-z0-9_]{1,30}$".
           */
          [k: string]: string;
        },
        {
          /**
           * Payment method identifer.
           */
          method: string;
          /**
           * Payment method field value.
           *
           * This interface was referenced by `undefined`'s JSON-Schema definition
           * via the `patternProperty` "^[a-z0-9_]{1,30}$".
           */
          [k: string]: string;
        },
        {
          /**
           * Payment method identifer.
           */
          method: string;
          /**
           * Payment method field value.
           *
           * This interface was referenced by `undefined`'s JSON-Schema definition
           * via the `patternProperty` "^[a-z0-9_]{1,30}$".
           */
          [k: string]: string;
        },
        {
          /**
           * Payment method identifer.
           */
          method: string;
          /**
           * Payment method field value.
           *
           * This interface was referenced by `undefined`'s JSON-Schema definition
           * via the `patternProperty` "^[a-z0-9_]{1,30}$".
           */
          [k: string]: string;
        }
      ]
    | [
        {
          /**
           * Payment method identifer.
           */
          method: string;
          /**
           * Payment method field value.
           *
           * This interface was referenced by `undefined`'s JSON-Schema definition
           * via the `patternProperty` "^[a-z0-9_]{1,30}$".
           */
          [k: string]: string;
        },
        {
          /**
           * Payment method identifer.
           */
          method: string;
          /**
           * Payment method field value.
           *
           * This interface was referenced by `undefined`'s JSON-Schema definition
           * via the `patternProperty` "^[a-z0-9_]{1,30}$".
           */
          [k: string]: string;
        },
        {
          /**
           * Payment method identifer.
           */
          method: string;
          /**
           * Payment method field value.
           *
           * This interface was referenced by `undefined`'s JSON-Schema definition
           * via the `patternProperty` "^[a-z0-9_]{1,30}$".
           */
          [k: string]: string;
        },
        {
          /**
           * Payment method identifer.
           */
          method: string;
          /**
           * Payment method field value.
           *
           * This interface was referenced by `undefined`'s JSON-Schema definition
           * via the `patternProperty` "^[a-z0-9_]{1,30}$".
           */
          [k: string]: string;
        },
        {
          /**
           * Payment method identifer.
           */
          method: string;
          /**
           * Payment method field value.
           *
           * This interface was referenced by `undefined`'s JSON-Schema definition
           * via the `patternProperty` "^[a-z0-9_]{1,30}$".
           */
          [k: string]: string;
        }
      ];
  /**
   * Contains payment methods to delete.
   *
   * @minItems 1
   * @maxItems 5
   */
  delete?:
    | [number]
    | [number, number]
    | [number, number, number]
    | [number, number, number, number]
    | [number, number, number, number, number];
  /**
   * Contains payment methods to update.
   */
  update?: {
    /**
     * Advertiser payment method ID.
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[0-9]{1,8}$".
     */
    [k: string]: {
      /**
       * Payment field to value to update.
       *
       * This interface was referenced by `undefined`'s JSON-Schema definition
       * via the `patternProperty` "^[a-z0-9_]{1,30}$".
       */
      [k: string]: string;
    };
  };
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * List P2P advertiser payment methods.
 */
export interface P2PAdvertiserPaymentMethodsResponse {
  /**
   * List of current methods.
   */
  p2p_advertiser_payment_methods?: {
    /**
     * Advertiser payment method ID, to be used for updates.
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[0-9]{1,8}$".
     */
    [k: string]: {
      /**
       * Display name of payment method.
       */
      display_name?: string;
      /**
       * Payment method fields.
       */
      fields: {
        /**
         * Field identifier.
         *
         * This interface was referenced by `undefined`'s JSON-Schema definition
         * via the `patternProperty` "^[a-z0-9_]{1,30}$".
         */
        [k: string]: {
          /**
           * Display name of payment method field.
           */
          display_name: string;
          /**
           * Is field required or optional.
           */
          required: number;
          /**
           * Field type.
           */
          type: "text" | "memo";
          /**
           * Current value of payment method field.
           */
          value: string;
        };
      };
      /**
       * Indicates if this method is available on adverts and orders.
       */
      is_enabled: 0 | 1;
      /**
       * Payment method identifier.
       */
      method: string;
      /**
       * Payment method type.
       */
      type: "bank" | "ewallet" | "other";
      /**
       * IDs of adverts that use this payment method.
       */
      used_by_adverts: string[] | null;
      /**
       * IDs of orders that use this payment method.
       */
      used_by_orders: string[] | null;
    };
  };
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "p2p_advertiser_payment_methods";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Retrieve advertisers has/had trade with the current advertiser.
 */
export interface P2PAdvertiserListRequest {
  /**
   * Must be 1
   */
  p2p_advertiser_list: 1;
  /**
   * [Optional] Search for advertiser by name. Partial matches will be returned.
   */
  advertiser_name?: string;
  /**
   * [Optional] Used to return only blocked or unblocked partners
   */
  is_blocked?: 0 | 1;
  /**
   * [Optional] Used for paging.
   */
  limit?: number;
  /**
   * [Optional] Used for paging.
   */
  offset?: number;
  /**
   * [Optional] How the results are sorted.
   */
  sort_by?: "name" | "created_time" | "last_interaction_time";
  /**
   * [Optional] Get all advertisers has/had trade.
   */
  trade_partners?: 0 | 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Retrieve advertisers has/had trade with the current advertiser.
 */
export interface P2PAdvertiserListResponse {
  p2p_advertiser_list?: P2PAdvertiserList;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "p2p_advertiser_list";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * P2P advertiser list.
 */
export interface P2PAdvertiserList {
  /**
   * List of advertisers.
   */
  list: {
    /**
     * Average difference of advert rate compared to the market rate over the past 30 days.
     */
    advert_rates: null | number;
    /**
     * Boolean value: 1 or 0, indicating whether the advertiser's identify has been verified.
     */
    basic_verification: 1 | 0;
    /**
     * The percentage of completed orders out of total orders as a buyer within the past 30 days.
     */
    buy_completion_rate: null | number;
    /**
     * Buy order volume in the past 30 days.
     */
    buy_orders_amount: string;
    /**
     * The number of buy order completed within the past 30 days.
     */
    buy_orders_count: number;
    /**
     * The average time in seconds taken to make payment as a buyer within the past 30 days.
     */
    buy_time_avg: number | null;
    /**
     * The average time in seconds taken to cancel orders as a buyer within the past 30 days.
     */
    cancel_time_avg: number | null;
    /**
     * The epoch time that the trade partner became an advertiser.
     */
    created_time: number;
    /**
     * Default description that can be used every time an advert is created.
     */
    default_advert_description: string;
    /**
     * The advertiser's first name.
     */
    first_name?: string;
    /**
     * Boolean value: 1 or 0, indicating whether the advertiser's address has been verified.
     */
    full_verification: 1 | 0;
    /**
     * The advertiser's identification number.
     */
    id: string;
    /**
     * The approval status of the advertiser.
     */
    is_approved: 0 | 1;
    /**
     * Indicates that the advertiser is blocked by the current user.
     */
    is_blocked: 0 | 1;
    /**
     * Indicates if the trade partner is favourited by requester.
     */
    is_favourite?: 0 | 1;
    /**
     * Indicates if the advertiser's active adverts are listed. When `0`, adverts won't be listed regardless if they are active or not.
     */
    is_listed: 0 | 1;
    /**
     * Indicates if the advertiser is currently online.
     */
    is_online: 0 | 1;
    /**
     * Indicates if the trade partner is recommended by requester.
     */
    is_recommended?: 0 | 1;
    /**
     * Inidcates whether the advertiser's schedule allows P2P transactions at the current time.
     */
    is_schedule_available: 0 | 1;
    /**
     * The advertiser's last name.
     */
    last_name?: string;
    /**
     * Epoch of the latest time the advertiser was online, up to 6 months.
     */
    last_online_time: number | null;
    /**
     * The advertiser's displayed name.
     */
    name: string;
    /**
     * Number of different users the advertiser has traded with since registration.
     */
    partner_count: number;
    /**
     * Average rating of the advertiser, range is 1-5.
     */
    rating_average: null | number;
    /**
     * Number of ratings given to the advertiser.
     */
    rating_count: number;
    /**
     * Percentage of users who have recommended the advertiser.
     */
    recommended_average: null | number;
    /**
     * Number of times the advertiser has been recommended.
     */
    recommended_count: number | null;
    /**
     * The average time in seconds taken to release funds as a seller within the past 30 days.
     */
    release_time_avg: number | null;
    /**
     * [Optional] Weekly availability schedule. Ads are visible and orders can be created only during available periods.
     */
    schedule?:
      | {
          /**
           * Minute of week when availablility ends. Zero is Sunday 00:00 UST.
           */
          end_min: number | null;
          /**
           * Minute of week when availablility starts. Zero is Sunday 00:00 UST.
           */
          start_min: number | null;
        }[]
      | null;
    /**
     * The percentage of completed orders out of total orders as a seller within the past 30 days.
     */
    sell_completion_rate: null | number;
    /**
     * Sell order volume in the past 30 days.
     */
    sell_orders_amount: string;
    /**
     * The number of sell order orders completed within the past 30 days.
     */
    sell_orders_count: number;
    /**
     * The percentage of completed orders out of all orders within the past 30 days.
     */
    total_completion_rate: null | number;
    /**
     * The total number of orders completed since advertiser registration.
     */
    total_orders_count: number;
    /**
     * Total order volume since advertiser registration.
     */
    total_turnover: string;
  }[];
}
/**
 * Retrieve information about a P2P advertiser.
 */
export interface P2PAdvertiserInformationRequest {
  /**
   * Must be 1
   */
  p2p_advertiser_info: 1;
  /**
   * [Optional] The unique identifier for this advertiser. If not provided, returns advertiser information about the current account.
   */
  id?: string;
  /**
   * [Optional] If set to 1, will send updates whenever there is an update to advertiser
   */
  subscribe?: 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Returns information about the given advertiser ID.
 */
export interface P2PAdvertiserInformationResponse {
  p2p_advertiser_info?: P2PAdvertiserInfo;
  subscription?: SubscriptionInformation;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "p2p_advertiser_info";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * P2P advertiser information.
 */
export interface P2PAdvertiserInfo {
  /**
   * Number of active fixed rate adverts belonging to the advertiser.
   */
  active_fixed_ads?: number;
  /**
   * Number of active floating rate adverts belonging to the advertiser.
   */
  active_float_ads?: number;
  /**
   * Average difference of advert rate compared to the market rate over the past 30 days.
   */
  advert_rates: null | number;
  /**
   * Amount of funds available to sell on P2P. May be less than account balance according to deposit methods used.
   */
  balance_available?: number;
  /**
   * Boolean value: 1 or 0, indicating whether the advertiser's identify has been verified.
   */
  basic_verification: 1 | 0;
  /**
   * Block trading limits, if block trading is allowed.
   */
  block_trade?: {
    /**
     * Maximum order amount for block trade adverts.
     */
    max_order_amount: string;
    /**
     * Minimum order amount for block trade adverts.
     */
    min_order_amount: string;
  };
  /**
   * The number of P2P users who have blocked this advertiser.
   */
  blocked_by_count?: number;
  /**
   * If a temporary bar was placed, this is the epoch time at which it will end.
   */
  blocked_until?: number;
  /**
   * The percentage of completed orders out of total orders as a buyer within the past 30 days.
   */
  buy_completion_rate: null | number;
  /**
   * Buy order volume in the past 30 days.
   */
  buy_orders_amount: string;
  /**
   * The number of buy order completed within the past 30 days.
   */
  buy_orders_count: number;
  /**
   * The average time in seconds taken to make payment as a buyer within the past 30 days.
   */
  buy_time_avg: number | null;
  /**
   * The average time in seconds taken to cancel orders as a buyer within the past 30 days.
   */
  cancel_time_avg: number | null;
  /**
   * The number of times the user may cancel orders before being temporarily blocked.
   */
  cancels_remaining?: number;
  /**
   * The token to be used for authenticating the client for chat.
   */
  chat_token?: null | string;
  /**
   * The unique identifier for the chat user.
   */
  chat_user_id?: null | string;
  /**
   * Advertiser's contact information.
   */
  contact_info?: string;
  /**
   * The epoch time that the client became an advertiser.
   */
  created_time: number;
  /**
   * Total value of P2P buy transactions in the past 24 hours.
   */
  daily_buy?: string;
  /**
   * Maximum allowed value of P2P buy transactions in a 24 hour period.
   */
  daily_buy_limit?: string;
  /**
   * Total value of P2P sell transactions in the past 24 hours.
   */
  daily_sell?: string;
  /**
   * Maximum allowed value of P2P sell transactions in a 24 hour period.
   */
  daily_sell_limit?: string;
  /**
   * Default description that can be used every time an advert is created.
   */
  default_advert_description: string;
  /**
   * The advertiser's first name.
   */
  first_name?: string;
  /**
   * Boolean value: 1 or 0, indicating whether the advertiser's address has been verified.
   */
  full_verification: 1 | 0;
  /**
   * The advertiser's identification number.
   */
  id: string;
  /**
   * The approval status of the advertiser.
   */
  is_approved: 0 | 1;
  /**
   * Indicates that the advertiser is blocked by the current user.
   */
  is_blocked?: 0 | 1;
  /**
   * Indicates that the advertiser is a favourite of the current user
   */
  is_favourite?: 0 | 1;
  /**
   * Indicates if the advertiser's active adverts are listed. When `0`, adverts won't be listed regardless if they are active or not.
   */
  is_listed: 0 | 1;
  /**
   * Indicates if the advertiser is currently online.
   */
  is_online: 0 | 1;
  /**
   * Indicates that the advertiser was recommended in the most recent review by the current user.
   */
  is_recommended?: null | 0 | 1;
  /**
   * Inidcates whether the advertiser's schedule allows P2P transactions at the current time.
   */
  is_schedule_available: 0 | 1;
  /**
   * The advertiser's last name.
   */
  last_name?: string;
  /**
   * Epoch of the latest time the advertiser was online, up to 6 months.
   */
  last_online_time: number | null;
  /**
   * Maximum order amount for adverts.
   */
  max_order_amount?: string;
  /**
   * Sell ads will be hidden when your available balance or remaining daily sell limit falls beneath this value.
   */
  min_balance?: string;
  /**
   * Minimum order amount for adverts.
   */
  min_order_amount?: string;
  /**
   * The advertiser's displayed name.
   */
  name: string;
  /**
   * Number of different users the advertiser has traded with since registration.
   */
  partner_count: number;
  /**
   * Advertiser's payment information.
   */
  payment_info?: string;
  /**
   * Average rating of the advertiser, range is 1-5.
   */
  rating_average: null | number;
  /**
   * Number of ratings given to the advertiser.
   */
  rating_count: number;
  /**
   * Percentage of users who have recommended the advertiser.
   */
  recommended_average: null | number;
  /**
   * Number of times the advertiser has been recommended.
   */
  recommended_count: number | null;
  /**
   * The average time in seconds taken to release funds as a seller within the past 30 days.
   */
  release_time_avg: number | null;
  /**
   * [Optional] Weekly availability schedule. Ads are visible and orders can be created only during available periods.
   */
  schedule?:
    | {
        /**
         * Minute of week when availablility ends. Zero is Sunday 00:00 UST.
         */
        end_min: number | null;
        /**
         * Minute of week when availablility starts. Zero is Sunday 00:00 UST.
         */
        start_min: number | null;
      }[]
    | null;
  /**
   * The percentage of completed orders out of total orders as a seller within the past 30 days.
   */
  sell_completion_rate: null | number;
  /**
   * Sell order volume in the past 30 days.
   */
  sell_orders_amount: string;
  /**
   * The number of sell order orders completed within the past 30 days.
   */
  sell_orders_count: number;
  /**
   * When `1`, the advertiser's real name will be displayed on to other users on adverts and orders.
   */
  show_name?: 0 | 1;
  /**
   * The percentage of completed orders out of all orders within the past 30 days.
   */
  total_completion_rate: null | number;
  /**
   * The total number of orders completed since advertiser registration.
   */
  total_orders_count: number;
  /**
   * Total order volume since advertiser registration.
   */
  total_turnover: string;
  /**
   * New daily limits available.
   */
  upgradable_daily_limits?: {
    /**
     * When `1`, upgrade will provide block trading.
     */
    block_trade?: 0 | 1;
    /**
     * Upgradable daily buy limit.
     */
    max_daily_buy: string;
    /**
     * Upgradable daily sell limit.
     */
    max_daily_sell: string;
  };
  /**
   * Remaining withdrawal_limit of a non-fully authenticated advertiser.
   */
  withdrawal_limit?: null | string;
}
/**
 * For subscription requests only.
 */
export interface SubscriptionInformation {
  /**
   * A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.
   */
  id: string;
}
/**
 * Registers the client as a P2P advertiser.
 */
export interface P2PAdvertiserCreateRequest {
  /**
   * Must be 1
   */
  p2p_advertiser_create: 1;
  /**
   * [Optional] Advertiser's contact information, to be used as a default for new sell adverts.
   */
  contact_info?: string;
  /**
   * [Optional] Default description that can be used every time an advert is created.
   */
  default_advert_description?: string;
  /**
   * The advertiser's displayed name.
   */
  name: string;
  /**
   * [Optional] Advertiser's payment information, to be used as a default for new sell adverts.
   */
  payment_info?: string;
  /**
   * [Optional] Weekly availability schedule. Ads are visible and orders can be created only during available periods.
   *
   * @maxItems 50
   */
  schedule?:
    | {
        /**
         * Minute of week when availablility ends. Zero is Sunday 00:00 UST.
         */
        end_min: number | null;
        /**
         * Minute of week when availablility starts. Zero is Sunday 00:00 UST.
         */
        start_min: number | null;
      }[]
    | null;
  /**
   * [Optional] If set to 1, will send updates whenever there is an update to advertiser
   */
  subscribe?: 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Returns information of the created advertiser.
 */
export interface P2PAdvertiserCreateResponse {
  p2p_advertiser_create?: P2PAdvertiserCreate;
  subscription?: SubscriptionInformation;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "p2p_advertiser_create";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * P2P advertiser information.
 */
export interface P2PAdvertiserCreate {
  /**
   * Average difference of advert rate compared to the market rate over the past 30 days.
   */
  advert_rates: null | number;
  /**
   * Amount of funds available to sell on P2P. May be less than account balance according to deposit methods used.
   */
  balance_available: number;
  /**
   * Boolean value: 1 or 0, indicating whether the advertiser's identify has been verified.
   */
  basic_verification: 1 | 0;
  /**
   * The number of P2P users who have blocked this advertiser.
   */
  blocked_by_count: number;
  /**
   * The percentage of completed orders out of total orders as a buyer within the past 30 days.
   */
  buy_completion_rate: null | number;
  /**
   * Buy order volume in the past 30 days.
   */
  buy_orders_amount: string;
  /**
   * The number of buy order completed within the past 30 days.
   */
  buy_orders_count: number;
  /**
   * The average time in seconds taken to make payment as a buyer within the past 30 days.
   */
  buy_time_avg: number | null;
  /**
   * The average time in seconds taken to cancel orders as a buyer within the past 30 days.
   */
  cancel_time_avg: number | null;
  /**
   * The number of times the user may cancel orders before being temporarily blocked.
   */
  cancels_remaining: number;
  /**
   * The token to be used for authenticating the client for chat.
   */
  chat_token: null | string;
  /**
   * The unique identifier for the chat user.
   */
  chat_user_id: null | string;
  /**
   * Advertiser's contact information.
   */
  contact_info: string;
  /**
   * The epoch time that the client became an advertiser.
   */
  created_time: number;
  /**
   * Total value of P2P buy transactions in the past 24 hours.
   */
  daily_buy?: string;
  /**
   * Maximum allowed value of P2P buy transactions in a 24 hour period.
   */
  daily_buy_limit?: string;
  /**
   * Total value of P2P sell transactions in the past 24 hours.
   */
  daily_sell?: string;
  /**
   * Maximum allowed value of P2P sell transactions in a 24 hour period.
   */
  daily_sell_limit?: string;
  /**
   * Default description that can be used every time an advert is created.
   */
  default_advert_description: string;
  /**
   * Boolean value: 1 or 0, indicating whether the advertiser's address has been verified.
   */
  full_verification: 1 | 0;
  /**
   * The advertiser's identification number.
   */
  id: string;
  /**
   * The approval status of the advertiser.
   */
  is_approved: 0 | 1;
  /**
   * Indicates if the advertiser's active adverts are listed. When `0`, adverts won't be listed regardless if they are active or not.
   */
  is_listed: 0 | 1;
  /**
   * Indicates if the advertiser is currently online.
   */
  is_online: 0 | 1;
  /**
   * Inidcates whether the advertiser's schedule allows P2P transactions at the current time.
   */
  is_schedule_available: 0 | 1;
  /**
   * Epoch of the latest time the advertiser was online, up to 6 months.
   */
  last_online_time: number | null;
  /**
   * Maximum order amount for adverts.
   */
  max_order_amount?: string;
  /**
   * Sell ads will be hidden when your available balance or remaining daily sell limit falls beneath this value.
   */
  min_balance?: string;
  /**
   * Minimum order amount for adverts.
   */
  min_order_amount?: string;
  /**
   * The advertiser's displayed name.
   */
  name: string;
  /**
   * Number of different users the advertiser has traded with since registration.
   */
  partner_count: number;
  /**
   * Advertiser's payment information.
   */
  payment_info: string;
  /**
   * Average rating of the advertiser, range is 1-5.
   */
  rating_average: null | number;
  /**
   * Number of ratings given to the advertiser.
   */
  rating_count: number;
  /**
   * Percentage of users who have recommended the advertiser.
   */
  recommended_average: null | number;
  /**
   * Number of times the advertiser has been recommended.
   */
  recommended_count: number | null;
  /**
   * The average time in seconds taken to release funds as a seller within the past 30 days.
   */
  release_time_avg: number | null;
  /**
   * [Optional] Weekly availability schedule. Ads are visible and orders can be created only during available periods.
   */
  schedule?:
    | {
        /**
         * Minute of week when availablility ends. Zero is Sunday 00:00 UST.
         */
        end_min: number | null;
        /**
         * Minute of week when availablility starts. Zero is Sunday 00:00 UST.
         */
        start_min: number | null;
      }[]
    | null;
  /**
   * The percentage of completed orders out of total orders as a seller within the past 30 days.
   */
  sell_completion_rate: null | number;
  /**
   * Sell order volume in the past 30 days.
   */
  sell_orders_amount: string;
  /**
   * The number of sell order orders completed within the past 30 days.
   */
  sell_orders_count: number;
  /**
   * When `1`, the advertiser's real name will be displayed to other users on adverts and orders.
   */
  show_name: 0 | 1;
  /**
   * The percentage of completed orders out of all orders within the past 30 days.
   */
  total_completion_rate: null | number;
  /**
   * The total number of orders completed since advertiser registration.
   */
  total_orders_count: number;
  /**
   * Total order volume since advertiser registration.
   */
  total_turnover: string;
  /**
   * Remaining withdrawal_limit of a non-fully authenticated advertiser.
   */
  withdrawal_limit?: null | string;
}
/**
 * For subscription requests only.
 */
export interface SubscriptionInformation {
  /**
   * A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.
   */
  id: string;
}
/**
 * Returns all P2P adverts created by the authorized client. Can only be used by a registered P2P advertiser.
 */
export interface P2PAdvertiserAdvertsRequest {
  /**
   * Must be 1
   */
  p2p_advertiser_adverts: 1;
  /**
   * [Optional] Used for paging. This value will also apply to subsription responses.
   */
  limit?: number;
  /**
   * [Optional] Used for paging. This value will also apply to subsription responses.
   */
  offset?: number;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * All adverts belonging to the current advertiser.
 */
export interface P2PAdvertiserAdvertsResponse {
  p2p_advertiser_adverts?: P2PAdvertiserAdverts;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "p2p_advertiser_adverts";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * List of the P2P advertiser adverts.
 */
export interface P2PAdvertiserAdverts {
  /**
   * List of advertiser adverts.
   */
  list: {
    /**
     * Currency for this advert. This is the system currency to be transferred between advertiser and client.
     */
    account_currency: string;
    /**
     * The number of active orders against this advert.
     */
    active_orders: number;
    advertiser_details: AdvertiserDetails;
    /**
     * The total amount specified in advert, in `account_currency`.
     */
    amount: number;
    /**
     * The total amount specified in advert, in `account_currency`, formatted to appropriate decimal places.
     */
    amount_display: string;
    /**
     * Indicates if this is block trade advert or not.
     */
    block_trade: 0 | 1;
    /**
     * Advertiser contact information. Only applicable for 'sell adverts'.
     */
    contact_info: string;
    /**
     * This is the type of transaction from the counterparty's perspective.
     */
    counterparty_type: "buy" | "sell";
    /**
     * The target country code of the advert.
     */
    country: string;
    /**
     * The advert creation time in epoch.
     */
    created_time: number;
    /**
     * Days until automatic inactivation of this ad, if no activity occurs.
     */
    days_until_archive?: number;
    /**
     * General information about the advert.
     */
    description: string;
    /**
     * Conversion rate from account currency to local currency, using current market rate if applicable.
     */
    effective_rate: null | number;
    /**
     * Conversion rate from account currency to local currency, using current market rate if applicable, formatted to appropriate decimal places.
     */
    effective_rate_display: null | string;
    /**
     * 2 letter country codes. Counterparties who do not live in these countries are not allowed to place orders.
     */
    eligible_countries?: string[];
    /**
     * The unique identifier for this advert.
     */
    id: string;
    /**
     * The activation status of the advert.
     */
    is_active: 0 | 1;
    /**
     * Indicates that this advert will appear on the main advert list.
     */
    is_visible: 0 | 1;
    /**
     * Local currency for this advert. This is the form of payment to be arranged directly between advertiser and client.
     */
    local_currency: string;
    /**
     * Maximum order amount, in `account_currency`.
     */
    max_order_amount: number;
    /**
     * Maximum order amount, in `account_currency`, formatted to appropriate decimal places.
     */
    max_order_amount_display: string;
    /**
     * Maximum order amount at this time, in `account_currency`.
     */
    max_order_amount_limit: number;
    /**
     * Maximum order amount at this time, in `account_currency`, formatted to appropriate decimal places.
     */
    max_order_amount_limit_display: string;
    /**
     * Counterparties who have a 30 day completion rate less than this value are not allowed to place orders.
     */
    min_completion_rate?: number;
    /**
     * Counterparties who joined less than this number of days ago are not allowed to place orders.
     */
    min_join_days?: number;
    /**
     * Minimum order amount, in `account_currency`.
     */
    min_order_amount: number;
    /**
     * Minimum order amount, in `account_currency`, formatted to appropriate decimal places.
     */
    min_order_amount_display: string;
    /**
     * Minimum order amount at this time, in `account_currency`.
     */
    min_order_amount_limit: number;
    /**
     * Minimum order amount at this time, in `account_currency`, formatted to appropriate decimal places.
     */
    min_order_amount_limit_display: string;
    /**
     * Counterparties who have an average rating less than this value are not allowed to place orders.
     */
    min_rating?: number;
    /**
     * Expiry period (seconds) for order created against this ad.
     */
    order_expiry_period: number;
    /**
     * Payment instructions. Only applicable for 'sell adverts'.
     */
    payment_info: string;
    /**
     * Payment method name (deprecated).
     */
    payment_method: null | string;
    /**
     * Names of supported payment methods.
     */
    payment_method_names?: string[];
    /**
     * Cost of the advert in local currency.
     */
    price: null | number;
    /**
     * Cost of the advert in local currency, formatted to appropriate decimal places.
     */
    price_display: null | string;
    /**
     * Conversion rate from advertiser's account currency to `local_currency`. An absolute rate value (fixed), or percentage offset from current market rate (floating).
     */
    rate: number;
    /**
     * Conversion rate formatted to appropriate decimal places.
     */
    rate_display: string;
    /**
     * Type of rate, fixed or floating.
     */
    rate_type: "fixed" | "float";
    /**
     * Amount currently available for orders, in `account_currency`.
     */
    remaining_amount: number;
    /**
     * Amount currently available for orders, in `account_currency`, formatted to appropriate decimal places.
     */
    remaining_amount_display: string;
    /**
     * Whether this is a buy or a sell.
     */
    type: "buy" | "sell";
    /**
     * Reasons why an advert is not visible. Possible values:
     * - `advert_fixed_rate_disabled`: fixed rate adverts are no longer available in the advert's country.
     * - `advert_float_rate_disabled`: floating rate adverts are no longer available in the advert's country.
     * - `advert_inactive`: the advert is set inactive.
     * - `advert_max_limit`: the minimum order amount exceeds the system maximum order.
     * - `advert_min_limit`: the maximum order amount is too small to be shown on the advert list.
     * - `advert_remaining`: the remaining amount of the advert is below the minimum order.
     * - `advert_no_payment_methods`: the advert has no valid payment methods.
     * - `advertiser_ads_paused`: the advertiser has paused all adverts.
     * - `advertiser_approval`: the advertiser's proof of identity is not verified.
     * - `advertiser_balance`: the advertiser's P2P balance is less than the minimum order.
     * - `advertiser_schedule`: the advertiser's schedule does not have availability between now and now + order_expiry_period.
     * - `advertiser_block_trade_ineligible`: the advertiser is not currently eligible for block trading.
     * - `advertiser_daily_limit`: the advertiser's remaining daily limit is less than the minimum order.
     * - `advertiser_temp_ban`: the advertiser is temporarily banned from P2P.
     */
    visibility_status?: (
      | "advert_fixed_rate_disabled"
      | "advert_float_rate_disabled"
      | "advert_inactive"
      | "advert_max_limit"
      | "advert_min_limit"
      | "advert_remaining"
      | "advert_no_payment_methods"
      | "advertiser_ads_paused"
      | "advertiser_approval"
      | "advertiser_balance"
      | "advertiser_block_trade_ineligible"
      | "advertiser_daily_limit"
      | "advertiser_schedule"
      | "advertiser_temp_ban"
    )[];
  }[];
}
/**
 * Details of the advertiser for this advert.
 */
export interface AdvertiserDetails {
  /**
   * The total number of orders completed in the past 30 days.
   */
  completed_orders_count: number;
  /**
   * The advertiser's first name.
   */
  first_name?: string;
  /**
   * The advertiser's unique identifier.
   */
  id: string;
  /**
   * Indicates if the advertiser is currently online.
   */
  is_online: 0 | 1;
  /**
   * Inidcates whether the advertiser's schedule has availability between now and now + order_expiry_period.
   */
  is_schedule_available: 0 | 1;
  /**
   * The advertiser's last name.
   */
  last_name?: string;
  /**
   * Epoch of the latest time the advertiser was online, up to 6 months.
   */
  last_online_time: number | null;
  /**
   * The advertiser's displayed name.
   */
  name: string;
  /**
   * Average rating of the advertiser, range is 1-5.
   */
  rating_average: null | number;
  /**
   * Number of ratings given to the advertiser.
   */
  rating_count: number;
  /**
   * Percentage of users who have recommended the advertiser.
   */
  recommended_average: null | number;
  /**
   * Number of times the advertiser has been recommended.
   */
  recommended_count: number | null;
  /**
   * The percentage of successfully completed orders made by or placed against the advertiser within the past 30 days.
   */
  total_completion_rate: null | number;
}
/**
 * Updates a P2P advert. Can only be used by the advertiser.
 */
export interface P2PAdvertUpdateRequest {
  /**
   * Must be 1
   */
  p2p_advert_update: 1;
  /**
   * [Optional] Advertiser contact information.
   */
  contact_info?: string;
  /**
   * [Optional] If set to 1, permanently deletes the advert.
   */
  delete?: 0 | 1;
  /**
   * [Optional] General information about the advert.
   */
  description?: string;
  /**
   * [Optional] 2 letter country codes. Counterparties who do not live in these countries will not be allowed to place orders against this advert. An empty array or null value will clear the condition.
   *
   * @maxItems 250
   */
  eligible_countries?: string[] | null;
  /**
   * The unique identifier for this advert.
   */
  id: string;
  /**
   * [Optional] Activate or deactivate the advert.
   */
  is_active?: 0 | 1;
  /**
   * [Optional] Local currency for this advert.
   */
  local_currency?: string;
  /**
   * [Optional] Maximum allowed amount for the orders of this advert, in advertiser's `account_currency`. Should be more than or equal to `min_order_amount`.
   */
  max_order_amount?: number;
  /**
   * [Optional] Counterparties who have a 30 day completion rate less than this value will not be allowed to place orders against this advert. A an empty array or null value will clear the condition.
   */
  min_completion_rate?: null | number;
  /**
   * [Optional] Counterparties who joined less than this number of days ago will not be allowed to place orders against this advert. A null value will clear the condition.
   */
  min_join_days?: number | null;
  /**
   * [Optional] Minimum allowed amount for the orders of this advert, in advertiser's `account_currency`. Should be less than or equal to `max_order_amount`.
   */
  min_order_amount?: number;
  /**
   * [Optional] Counterparties who have an average rating less than this value will not be allowed to place orders against this advert. A null value will clear the condition.
   */
  min_rating?: null | number;
  /**
   * [Optional] Expiry period (seconds) for order created against this ad.
   */
  order_expiry_period?: number;
  /**
   * [Optional] Payment instructions.
   */
  payment_info?: string;
  /**
   * [Optional] IDs of previously saved payment methods as returned from p2p_advertiser_payment_methods, only applicable for sell ads. Exisiting methods will be replaced.
   *
   * @maxItems 3
   */
  payment_method_ids?: [] | [number] | [number, number] | [number, number, number];
  /**
   * [Optional] Payment method identifiers as returned from p2p_payment_methods, only applicable for buy ads. Exisiting methods will be replaced.
   *
   * @maxItems 3
   */
  payment_method_names?: [] | [string] | [string, string] | [string, string, string];
  /**
   * [Optional] Conversion rate from advertiser's account currency to `local_currency`. An absolute rate value (fixed), or percentage offset from current market rate (floating).
   */
  rate?: number;
  /**
   * [Optional] Type of rate, fixed or floating.
   */
  rate_type?: "fixed" | "float";
  /**
   * [Optional] The total available amount of the advert, in advertiser's account currency.
   */
  remaining_amount?: number;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Returns information about the updated advert.
 */
export interface P2PAdvertUpdateResponse {
  p2p_advert_update?: P2PAdvertUpdate;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "p2p_advert_update";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * P2P updated advert information.
 */
export interface P2PAdvertUpdate {
  /**
   * Currency for this advert. This is the system currency to be transferred between advertiser and client.
   */
  account_currency?: string;
  /**
   * The number of active orders against this advert.
   */
  active_orders?: number;
  advertiser_details?: AdvertiserDetails;
  /**
   * The total amount specified in advert, in `account_currency`.
   */
  amount?: number;
  /**
   * The total amount specified in advert, in `account_currency`, formatted to appropriate decimal places.
   */
  amount_display?: string;
  /**
   * Indicates if this is block trade advert or not.
   */
  block_trade?: 0 | 1;
  /**
   * Advertiser contact information. Only applicable for 'sell adverts'.
   */
  contact_info?: string;
  /**
   * Type of transaction from the opposite party's perspective.
   */
  counterparty_type?: "buy" | "sell";
  /**
   * The target country code of the advert.
   */
  country?: string;
  /**
   * The advert creation time in epoch.
   */
  created_time?: number;
  /**
   * Days until automatic inactivation of this ad, if no activity occurs.
   */
  days_until_archive?: number;
  /**
   * Indicates that the advert has been deleted.
   */
  deleted?: 1;
  /**
   * General information about the advert.
   */
  description?: string;
  /**
   * Conversion rate from account currency to local currency, using current market rate if applicable.
   */
  effective_rate?: null | number;
  /**
   * Conversion rate from account currency to local currency, using current market rate if applicable, formatted to appropriate decimal places.
   */
  effective_rate_display?: null | string;
  /**
   * 2 letter country codes. Counterparties who do not live in these countries are not allowed to place orders against this advert
   */
  eligible_countries?: string[];
  /**
   * The unique identifier for this advert.
   */
  id: string;
  /**
   * The activation status of the advert.
   */
  is_active?: 0 | 1;
  /**
   * Indicates that this advert will appear on the main advert list.
   */
  is_visible?: 0 | 1;
  /**
   * Local currency for this advert. This is the form of payment to be arranged directly between advertiser and client.
   */
  local_currency?: string;
  /**
   * Maximum order amount specified in advert, in `account_currency`.
   */
  max_order_amount?: number;
  /**
   * Maximum order amount specified in advert, in `account_currency`, formatted to appropriate decimal places.
   */
  max_order_amount_display?: string;
  /**
   * Maximum order amount at this time, in `account_currency`.
   */
  max_order_amount_limit?: number;
  /**
   * Maximum order amount at this time, in `account_currency`, formatted to appropriate decimal places.
   */
  max_order_amount_limit_display?: string;
  /**
   * Counterparties who have a 30 day completion rate less than this value are not allowed to place orders against this advert.
   */
  min_completion_rate?: number;
  /**
   * Counterparties who joined less than this number of days ago are not allowed to place orders against this advert.
   */
  min_join_days?: number;
  /**
   * Minimum order amount specified in advert, in `account_currency`. It is only visible to the advert owner.
   */
  min_order_amount?: number;
  /**
   * Minimum order amount specified in advert, in `account_currency`, formatted to appropriate decimal places.
   */
  min_order_amount_display?: string;
  /**
   * Minimum order amount at this time, in `account_currency`.
   */
  min_order_amount_limit?: number;
  /**
   * Minimum order amount at this time, in `account_currency`, formatted to appropriate decimal places.
   */
  min_order_amount_limit_display?: string;
  /**
   * Counterparties who have an average rating less than this value are not allowed to place orders against this advert.
   */
  min_rating?: number;
  /**
   * Expiry period (seconds) for order created against this ad.
   */
  order_expiry_period?: number;
  /**
   * Payment instructions. Only applicable for 'sell adverts'.
   */
  payment_info?: string;
  /**
   * Payment method name (deprecated).
   */
  payment_method?: null | string;
  /**
   * Details of available payment methods (sell adverts only).
   */
  payment_method_details?: {
    /**
     * Unique identifier.
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[0-9]{1,8}$".
     */
    [k: string]: {
      /**
       * Display name of payment method.
       */
      display_name?: string;
      /**
       * Payment method fields.
       */
      fields: {
        /**
         * Field identifier.
         *
         * This interface was referenced by `undefined`'s JSON-Schema definition
         * via the `patternProperty` "^[a-z0-9_]{1,30}$".
         */
        [k: string]: {
          /**
           * Display name of payment method field.
           */
          display_name: string;
          /**
           * Is field required or optional.
           */
          required: number;
          /**
           * Field type.
           */
          type: "text" | "memo";
          /**
           * Current value of payment method field.
           */
          value: string;
        };
      };
      /**
       * Indicates if this method is available on adverts.
       */
      is_enabled: 0 | 1;
      /**
       * Payment method identifier.
       */
      method: string;
      /**
       * Payment method type.
       */
      type: "bank" | "ewallet" | "other";
      /**
       * IDs of adverts that use this payment method.
       */
      used_by_adverts: string[] | null;
      /**
       * IDs of orders that use this payment method.
       */
      used_by_orders: string[] | null;
    };
  };
  /**
   * Names of supported payment methods.
   */
  payment_method_names?: string[];
  /**
   * Cost of the advert in local currency.
   */
  price?: null | number;
  /**
   * Cost of the advert in local currency, formatted to appropriate decimal places.
   */
  price_display?: null | string;
  /**
   * Conversion rate from advertiser's account currency to `local_currency`. An absolute rate value (fixed), or percentage offset from current market rate (floating).
   */
  rate?: number;
  /**
   * Conversion rate formatted to appropriate decimal places.
   */
  rate_display?: string;
  /**
   * Type of rate, fixed or floating.
   */
  rate_type?: "fixed" | "float";
  /**
   * Amount currently available for orders, in `account_currency`.
   */
  remaining_amount?: number;
  /**
   * Amount currently available for orders, in `account_currency`, formatted to appropriate decimal places.
   */
  remaining_amount_display?: string;
  /**
   * Whether this is a buy or a sell.
   */
  type?: "buy" | "sell";
  /**
   * Reasons why an advert is not visible. Possible values:
   * - `advert_fixed_rate_disabled`: fixed rate adverts are no longer available in the advert's country.
   * - `advert_float_rate_disabled`: floating rate adverts are no longer available in the advert's country.
   * - `advert_inactive`: the advert is set inactive.
   * - `advert_max_limit`: the minimum order amount exceeds the system maximum order.
   * - `advert_min_limit`: the maximum order amount is too small to be shown on the advert list.
   * - `advert_remaining`: the remaining amount of the advert is below the minimum order.
   * - `advert_no_payment_methods`: the advert has no valid payment methods.
   * - `advertiser_ads_paused`: the advertiser has paused all adverts.
   * - `advertiser_approval`: the advertiser's proof of identity is not verified.
   * - `advertiser_balance`: the advertiser's P2P balance is less than the minimum order.
   * - `advertiser_schedule`: the advertiser's schedule does not have availability between now and now + order_expiry_period.
   * - `advertiser_block_trade_ineligible`: the advertiser is not currently eligible for block trading.
   * - `advertiser_daily_limit`: the advertiser's remaining daily limit is less than the minimum order.
   * - `advertiser_temp_ban`: the advertiser is temporarily banned from P2P.
   */
  visibility_status?: (
    | "advert_fixed_rate_disabled"
    | "advert_float_rate_disabled"
    | "advert_inactive"
    | "advert_max_limit"
    | "advert_min_limit"
    | "advert_remaining"
    | "advert_no_payment_methods"
    | "advertiser_ads_paused"
    | "advertiser_approval"
    | "advertiser_balance"
    | "advertiser_block_trade_ineligible"
    | "advertiser_daily_limit"
    | "advertiser_schedule"
    | "advertiser_temp_ban"
  )[];
}
/**
 * Details of the advertiser for this advert.
 */
export interface AdvertiserDetails {
  /**
   * The total number of orders completed in the past 30 days.
   */
  completed_orders_count: number;
  /**
   * The advertiser's first name.
   */
  first_name?: string;
  /**
   * The advertiser's unique identifier.
   */
  id: string;
  /**
   * Indicates if the advertiser is currently online.
   */
  is_online: 0 | 1;
  /**
   * Inidcates whether the advertiser's schedule has availability between now and now + order_expiry_period.
   */
  is_schedule_available: 0 | 1;
  /**
   * The advertiser's last name.
   */
  last_name?: string;
  /**
   * Epoch of the latest time the advertiser was online, up to 6 months.
   */
  last_online_time: number | null;
  /**
   * The advertiser's displayed name.
   */
  name: string;
  /**
   * Average rating of the advertiser, range is 1-5.
   */
  rating_average: null | number;
  /**
   * Number of ratings given to the advertiser.
   */
  rating_count: number;
  /**
   * Percentage of users who have recommended the advertiser.
   */
  recommended_average: null | number;
  /**
   * Number of times the advertiser has been recommended.
   */
  recommended_count: number | null;
  /**
   * The percentage of successfully completed orders made by or placed against the advertiser within the past 30 days.
   */
  total_completion_rate: null | number;
}
/**
 * Returns available adverts for use with `p2p_order_create` .
 */
export interface P2PAdvertListRequest {
  /**
   * Must be 1
   */
  p2p_advert_list: 1;
  /**
   * [Optional] ID of the advertiser to list adverts for.
   */
  advertiser_id?: string;
  /**
   * [Optional] Search for advertiser by name. Partial matches will be returned.
   */
  advertiser_name?: string;
  /**
   * [Optional] How much to buy or sell, used to calculate prices.
   */
  amount?: number;
  /**
   * [Optional] Return block trade adverts when 1, non-block trade adverts when 0 (default).
   */
  block_trade?: 0 | 1;
  /**
   * [Optional] Filter the adverts by `counterparty_type`.
   */
  counterparty_type?: "buy" | "sell";
  /**
   * [Optional] Only show adverts from favourite advertisers. Default is 0.
   */
  favourites_only?: 0 | 1;
  /**
   * [Optional] If set to 1, adverts for which the current user's shcedule does not have availability from now until the full possible order expiry are not returned.
   */
  hide_client_schedule_unavailable?: 0 | 1;
  /**
   * [Optional] If set to 1, adverts for which the current user does not meet counteryparty terms are not returned.
   */
  hide_ineligible?: 0 | 1;
  /**
   * [Optional] Used for paging.
   */
  limit?: number;
  /**
   * [Optional] Currency to conduct payment transaction in. If not provided, only ads from country of residence will be returned.
   */
  local_currency?: string;
  /**
   * [Optional] Used for paging.
   */
  offset?: number;
  /**
   * [Optional] Search by supported payment methods.
   */
  payment_method?: string[];
  /**
   * [Optional] How the results are sorted.
   */
  sort_by?: "completion" | "rate" | "rating" | "recommended";
  /**
   * [Optional] If set to 1, ads that exceed this account's balance or turnover limits will not be shown.
   */
  use_client_limits?: 0 | 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Available adverts matching the requested criteria.
 */
export interface P2PAdvertListResponse {
  p2p_advert_list?: P2PAdvertList;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "p2p_advert_list";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * P2P adverts list.
 */
export interface P2PAdvertList {
  /**
   * List of adverts.
   */
  list: {
    /**
     * Currency for this advert. This is the system currency to be transferred between advertiser and client.
     */
    account_currency: string;
    /**
     * The number of active orders against this advert.
     */
    active_orders?: number;
    advertiser_details: AdvertiserDetails;
    /**
     * The total amount specified in advert, in `account_currency`. It is only visible to the advert owner.
     */
    amount?: number;
    /**
     * The total amount specified in advert, in `account_currency`, formatted to appropriate decimal places. It is only visible to the advert owner.
     */
    amount_display?: string;
    /**
     * Indicates if this is block trade advert or not.
     */
    block_trade: 0 | 1;
    /**
     * Advertiser contact information. Only applicable for 'sell adverts'.
     */
    contact_info?: string;
    /**
     * Type of transaction from the opposite party's perspective.
     */
    counterparty_type: "buy" | "sell";
    /**
     * The target country code of the advert.
     */
    country: string;
    /**
     * The advert creation time in epoch.
     */
    created_time: number;
    /**
     * Days until automatic inactivation of this ad, if no activity occurs.
     */
    days_until_archive?: number;
    /**
     * General information about the advert.
     */
    description: string;
    /**
     * Conversion rate from account currency to local currency, using current market rate if applicable.
     */
    effective_rate: null | number;
    /**
     * Conversion rate from account currency to local currency, using current market rate if applicable, formatted to appropriate decimal places.
     */
    effective_rate_display: null | string;
    /**
     * Reasons why the counterparty terms do not allow the current user to place orders against this advert. Possible values:
     * - `completion_rate`: current user's 30 day completion rate is less than `min_completion_rate`.
     * - `country`: current user's residence is not in `eligible_countries`.
     * - `join_date`: current user registered on P2P less than `min_join_days` in the past.
     * - `rating`: current user's average review rating is less than `min_rating`.
     */
    eligibility_status?: ("completion_rate" | "country" | "join_date" | "rating_average")[];
    /**
     * 2 letter country codes. Counterparties who do not live in these countries are not allowed to place orders against this advert.
     */
    eligible_countries?: string[];
    /**
     * The unique identifier for this advert.
     */
    id: string;
    /**
     * The activation status of the advert.
     */
    is_active: 0 | 1;
    /**
     * Inidcates whether the current user's schedule has availability between now and now + order_expiry_period.
     */
    is_client_schedule_available?: 0 | 1;
    /**
     * Indicates that the current user meets the counterparty terms for placing an order.
     */
    is_eligible?: 0 | 1;
    /**
     * Indicates that this advert will appear on the main advert list.
     */
    is_visible: 0 | 1;
    /**
     * Local currency for this advert. This is the form of payment to be arranged directly between advertiser and client.
     */
    local_currency: string;
    /**
     * Maximum order amount specified in advert, in `account_currency`. It is only visible for advertisers.
     */
    max_order_amount?: number;
    /**
     * Maximum order amount specified in advert, in `account_currency`, formatted to appropriate decimal places. It is only visible to the advert owner.
     */
    max_order_amount_display?: string;
    /**
     * Maximum order amount at this time, in `account_currency`.
     */
    max_order_amount_limit: number;
    /**
     * Maximum order amount at this time, in `account_currency`, formatted to appropriate decimal places.
     */
    max_order_amount_limit_display: string;
    /**
     * Counterparties who have a 30 day completion rate less than this value are not allowed to place orders against this advert.
     */
    min_completion_rate?: number;
    /**
     * Counterparties who joined less than this number of days ago are not allowed to place orders against this advert.
     */
    min_join_days?: number;
    /**
     * Minimum order amount specified in advert, in `account_currency`. It is only visible for advertisers.
     */
    min_order_amount?: number;
    /**
     * Minimum order amount specified in advert, in `account_currency`, formatted to appropriate decimal places. It is only visible to the advert owner.
     */
    min_order_amount_display?: string;
    /**
     * Minimum order amount at this time, in `account_currency`.
     */
    min_order_amount_limit: number;
    /**
     * Minimum order amount at this time, in `account_currency`, formatted to appropriate decimal places.
     */
    min_order_amount_limit_display: string;
    /**
     * Counterparties who have an average rating less than this value are not allowed to place orders against this advert.
     */
    min_rating?: number;
    /**
     * Expiry period (seconds) for order created against this ad.
     */
    order_expiry_period: number;
    /**
     * Payment instructions. Only applicable for 'sell adverts'.
     */
    payment_info?: string;
    /**
     * Payment method name (deprecated).
     */
    payment_method: null | string;
    /**
     * Names of supported payment methods.
     */
    payment_method_names?: string[];
    /**
     * Cost of the advert in local currency.
     */
    price: null | number;
    /**
     * Cost of the advert in local currency, formatted to appropriate decimal places.
     */
    price_display: null | string;
    /**
     * Conversion rate from advertiser's account currency to `local_currency`. An absolute rate value (fixed), or percentage offset from current market rate (floating).
     */
    rate: number;
    /**
     * Conversion rate formatted to appropriate decimal places.
     */
    rate_display: string;
    /**
     * Type of rate, fixed or floating.
     */
    rate_type: "fixed" | "float";
    /**
     * Amount currently available for orders, in `account_currency`. It is only visible to the advert owner.
     */
    remaining_amount?: number;
    /**
     * Amount currently available for orders, in `account_currency`, formatted to appropriate decimal places. It is only visible to the advert owner.
     */
    remaining_amount_display?: string;
    /**
     * Whether this is a buy or a sell.
     */
    type: "buy" | "sell";
    /**
     * Reasons why an advert is not visible. Possible values:
     * - `advert_fixed_rate_disabled`: fixed rate adverts are no longer available in the advert's country.
     * - `advert_float_rate_disabled`: floating rate adverts are no longer available in the advert's country.
     * - `advert_inactive`: the advert is set inactive.
     * - `advert_max_limit`: the minimum order amount exceeds the system maximum order.
     * - `advert_min_limit`: the maximum order amount is too small to be shown on the advert list.
     * - `advert_remaining`: the remaining amount of the advert is below the minimum order.
     * - `advert_no_payment_methods`: the advert has no valid payment methods.
     * - `advertiser_ads_paused`: the advertiser has paused all adverts.
     * - `advertiser_approval`: the advertiser's proof of identity is not verified.
     * - `advertiser_balance`: the advertiser's P2P balance is less than the minimum order.
     * - `advertiser_schedule`: the advertiser's schedule does not have availability between now and now + order_expiry_period.
     * - `advertiser_block_trade_ineligible`: the advertiser is not currently eligible for block trading.
     * - `advertiser_daily_limit`: the advertiser's remaining daily limit is less than the minimum order.
     * - `advertiser_temp_ban`: the advertiser is temporarily banned from P2P.
     */
    visibility_status?: (
      | "advert_fixed_rate_disabled"
      | "advert_float_rate_disabled"
      | "advert_inactive"
      | "advert_max_limit"
      | "advert_min_limit"
      | "advert_remaining"
      | "advert_no_payment_methods"
      | "advertiser_ads_paused"
      | "advertiser_approval"
      | "advertiser_balance"
      | "advertiser_block_trade_ineligible"
      | "advertiser_daily_limit"
      | "advertiser_schedule"
      | "advertiser_temp_ban"
    )[];
  }[];
}
/**
 * Details of the advertiser for this advert.
 */
export interface AdvertiserDetails {
  /**
   * The total number of orders completed in the past 30 days.
   */
  completed_orders_count: number;
  /**
   * The advertiser's first name.
   */
  first_name?: string;
  /**
   * The advertiser's unique identifier.
   */
  id: string;
  /**
   * Indicates that the advertiser is blocked by the current user.
   */
  is_blocked?: 0;
  /**
   * Indicates that the advertiser is a favourite.
   */
  is_favourite?: 0 | 1;
  /**
   * Indicates if the advertiser is currently online.
   */
  is_online: 0 | 1;
  /**
   * Indicates that the advertiser was recommended in the most recent review by the current user.
   */
  is_recommended?: null | 0 | 1;
  /**
   * Inidcates whether the advertiser's schedule has availability between now and now + order_expiry_period.
   */
  is_schedule_available: 0 | 1;
  /**
   * The advertiser's last name.
   */
  last_name?: string;
  /**
   * Epoch of the latest time the advertiser was online, up to 6 months.
   */
  last_online_time: number | null;
  /**
   * The advertiser's displayed name.
   */
  name: string;
  /**
   * Average rating of the advertiser, range is 1-5.
   */
  rating_average: null | number;
  /**
   * Number of ratings given to the advertiser.
   */
  rating_count: number;
  /**
   * Percentage of users who have recommended the advertiser.
   */
  recommended_average: null | number;
  /**
   * Number of times the advertiser has been recommended.
   */
  recommended_count: null | number;
  /**
   * The percentage of successfully completed orders made by or placed against the advertiser within the past 30 days.
   */
  total_completion_rate: null | number;
}
/**
 * Retrieve information about a P2P advert.
 */
export interface P2PAdvertInformationRequest {
  /**
   * Must be 1
   */
  p2p_advert_info: 1;
  /**
   * [Optional] The unique identifier for this advert. Optional when subscribe is 1. If not provided, all advertiser adverts will be subscribed.
   */
  id?: string;
  /**
   * [Optional] If set to 1, will send updates when changes occur. Optional when id is provided.
   */
  subscribe?: 1;
  /**
   * [Optional] If set to 1, the maximum order amount will be adjusted to the current balance and turnover limits of the account.
   */
  use_client_limits?: 0 | 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Returns information about the given advert ID.
 */
export interface P2PAdvertInformationResponse {
  p2p_advert_info?: P2PAdvertInfo;
  subscription?: SubscriptionInformation;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "p2p_advert_info";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * P2P advert information.
 */
export interface P2PAdvertInfo {
  /**
   * Currency for this advert. This is the system currency to be transferred between advertiser and client.
   */
  account_currency?: string;
  /**
   * The number of active orders against this advert.
   */
  active_orders?: number;
  advertiser_details?: AdvertiserDetails;
  /**
   * The total amount specified in advert, in `account_currency`. It is only visible to the advert owner.
   */
  amount?: number;
  /**
   * The total amount specified in advert, in `account_currency`, formatted to appropriate decimal places. It is only visible to the advert owner.
   */
  amount_display?: string;
  /**
   * Indicates if this is block trade advert or not.
   */
  block_trade?: 0 | 1;
  /**
   * Advertiser contact information. Only applicable for 'sell adverts'.
   */
  contact_info?: string;
  /**
   * Type of transaction from the opposite party's perspective.
   */
  counterparty_type?: "buy" | "sell";
  /**
   * The target country code of the advert.
   */
  country?: string;
  /**
   * The advert creation time in epoch.
   */
  created_time?: number;
  /**
   * Days until automatic inactivation of this ad, if no activity occurs.
   */
  days_until_archive?: number;
  /**
   * Indicates that the advert has been deleted.
   */
  deleted?: 1;
  /**
   * General information about the advert.
   */
  description?: string;
  /**
   * Conversion rate from account currency to local currency, using current market rate if applicable.
   */
  effective_rate?: null | number;
  /**
   * Conversion rate from account currency to local currency, using current market rate if applicable, formatted to appropriate decimal places.
   */
  effective_rate_display?: null | string;
  /**
   * Reasons why the counterparty terms do not allow the current user to place orders against this advert. Possible values:
   * - `completion_rate`: current user's 30 day completion rate is less than `min_completion_rate`.
   * - `country`: current user's residence is not in `eligible_countries`.
   * - `join_date`: current user registered on P2P less than `min_join_days` in the past.
   * - `rating`: current user's average review rating is less than `min_rating`.
   */
  eligibility_status?: ("completion_rate" | "country" | "join_date" | "rating_average")[];
  /**
   * 2 letter country codes. Counterparties who do not live in these countries are not allowed to place orders against this advert.
   */
  eligible_countries?: string[];
  /**
   * The unique identifier for this advert.
   */
  id?: string;
  /**
   * The activation status of the advert.
   */
  is_active?: 0 | 1;
  /**
   * Inidcates whether the current user's schedule has availability from now until now + order_expiry_period.
   */
  is_client_schedule_available?: 0 | 1;
  /**
   * Indicates that the current user meets the counterparty terms for placing orders against this advert.
   */
  is_eligible?: 0 | 1;
  /**
   * Indicates that this advert will appear on the main advert list.
   */
  is_visible?: 0 | 1;
  /**
   * Local currency for this advert. This is the form of payment to be arranged directly between advertiser and client.
   */
  local_currency?: string;
  /**
   * Maximum order amount specified in advert, in `account_currency`. It is only visible for advertisers.
   */
  max_order_amount?: number;
  /**
   * Maximum order amount specified in advert, in `account_currency`, formatted to appropriate decimal places. It is only visible to the advert owner.
   */
  max_order_amount_display?: string;
  /**
   * Maximum order amount at this time, in `account_currency`.
   */
  max_order_amount_limit?: number;
  /**
   * Maximum order amount at this time, in `account_currency`, formatted to appropriate decimal places.
   */
  max_order_amount_limit_display?: string;
  /**
   * Counterparties who have a 30 day completion rate less than this value are not allowed to place orders against this advert.
   */
  min_completion_rate?: number;
  /**
   * Counterparties who joined less than this number of days ago are not allowed to place orders against this advert.
   */
  min_join_days?: number;
  /**
   * Minimum order amount specified in advert, in `account_currency`. It is only visible for advertisers.
   */
  min_order_amount?: number;
  /**
   * Minimum order amount specified in advert, in `account_currency`, formatted to appropriate decimal places. It is only visible to the advert owner.
   */
  min_order_amount_display?: string;
  /**
   * Minimum order amount at this time, in `account_currency`.
   */
  min_order_amount_limit?: number;
  /**
   * Minimum order amount at this time, in `account_currency`, formatted to appropriate decimal places.
   */
  min_order_amount_limit_display?: string;
  /**
   * Counterparties who have an average rating less than this value are not allowed to place orders against this advert.
   */
  min_rating?: number;
  /**
   * Expiry period (seconds) for order created against this ad.
   */
  order_expiry_period?: number;
  /**
   * Payment instructions. Only applicable for 'sell adverts'.
   */
  payment_info?: string;
  /**
   * Payment method name (deprecated).
   */
  payment_method?: null | string;
  /**
   * Details of available payment methods (sell adverts only).
   */
  payment_method_details?: {
    /**
     * Unique identifier.
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[0-9]{1,8}$".
     */
    [k: string]: {
      /**
       * Display name of payment method.
       */
      display_name?: string;
      /**
       * Payment method fields.
       */
      fields: {
        /**
         * Field identifier.
         *
         * This interface was referenced by `undefined`'s JSON-Schema definition
         * via the `patternProperty` "^[a-z0-9_]{1,30}$".
         */
        [k: string]: {
          /**
           * Display name of payment method field.
           */
          display_name: string;
          /**
           * Is field required or optional.
           */
          required: number;
          /**
           * Field type.
           */
          type: "text" | "memo";
          /**
           * Current value of payment method field.
           */
          value: string;
        };
      };
      /**
       * Indicates whether method is enabled.
       */
      is_enabled: 0 | 1;
      /**
       * Payment method identifier.
       */
      method: string;
      /**
       * Payment method type.
       */
      type: "bank" | "ewallet" | "other";
      /**
       * IDs of adverts that use this payment method.
       */
      used_by_adverts: string[] | null;
      /**
       * IDs of orders that use this payment method.
       */
      used_by_orders: string[] | null;
    };
  };
  /**
   * Names of supported payment methods.
   */
  payment_method_names?: string[];
  /**
   * Cost of the advert in local currency.
   */
  price?: null | number;
  /**
   * Cost of the advert in local currency, formatted to appropriate decimal places.
   */
  price_display?: null | string;
  /**
   * Conversion rate from advertiser's account currency to `local_currency`. An absolute rate value (fixed), or percentage offset from current market rate (floating).
   */
  rate?: number;
  /**
   * Conversion rate formatted to appropriate decimal places.
   */
  rate_display?: string;
  /**
   * Type of rate, fixed or floating.
   */
  rate_type?: "fixed" | "float";
  /**
   * Amount currently available for orders, in `account_currency`. It is only visible for advertisers.
   */
  remaining_amount?: number;
  /**
   * Amount currently available for orders, in `account_currency`, formatted to appropriate decimal places. It is only visible to the advert owner.
   */
  remaining_amount_display?: string;
  /**
   * Whether this is a buy or a sell.
   */
  type?: "buy" | "sell";
  /**
   * Reasons why an advert is not visible. Possible values:
   * - `advert_fixed_rate_disabled`: fixed rate adverts are no longer available in the advert's country.
   * - `advert_float_rate_disabled`: floating rate adverts are no longer available in the advert's country.
   * - `advert_inactive`: the advert is set inactive.
   * - `advert_max_limit`: the minimum order amount exceeds the system maximum order.
   * - `advert_min_limit`: the maximum order amount is too small to be shown on the advert list.
   * - `advert_remaining`: the remaining amount of the advert is below the minimum order.
   * - `advert_no_payment_methods`: the advert has no valid payment methods.
   * - `advertiser_ads_paused`: the advertiser has paused all adverts.
   * - `advertiser_approval`: the advertiser's proof of identity is not verified.
   * - `advertiser_balance`: the advertiser's P2P balance is less than the minimum order.
   * - `advertiser_schedule`: the advertiser's schedule does not have availability between now and now + order_expiry_period.
   * - `advertiser_block_trade_ineligible`: the advertiser is not currently eligible for block trading.
   * - `advertiser_daily_limit`: the advertiser's remaining daily limit is less than the minimum order.
   * - `advertiser_temp_ban`: the advertiser is temporarily banned from P2P.
   */
  visibility_status?: (
    | "advert_fixed_rate_disabled"
    | "advert_float_rate_disabled"
    | "advert_inactive"
    | "advert_max_limit"
    | "advert_min_limit"
    | "advert_remaining"
    | "advert_no_payment_methods"
    | "advertiser_ads_paused"
    | "advertiser_approval"
    | "advertiser_balance"
    | "advertiser_block_trade_ineligible"
    | "advertiser_daily_limit"
    | "advertiser_schedule"
    | "advertiser_temp_ban"
  )[];
}
/**
 * Details of the advertiser for this advert.
 */
export interface AdvertiserDetails {
  /**
   * The total number of orders completed in the past 30 days.
   */
  completed_orders_count: number;
  /**
   * The advertiser's first name.
   */
  first_name?: string;
  /**
   * The advertiser's unique identifier.
   */
  id: string;
  /**
   * Indicates that the advertiser is blocked by the current user.
   */
  is_blocked?: 0 ;
  /**
   * Indicates that the advertiser is a favourite of the current user.
   */
  is_favourite?: 0 | 1;
  /**
   * Indicates if the advertiser is currently online.
   */
  is_online: 0 | 1;
  /**
   * Indicates that the advertiser was recommended in the most recent review by the current user.
   */
  is_recommended?: null | 0 | 1;
  /**
   * Inidcates whether the advertiser's schedule has availability between now and now + order_expiry_period.
   */
  is_schedule_available: 0 | 1;
  /**
   * The advertiser's last name.
   */
  last_name?: string;
  /**
   * Epoch of the latest time the advertiser was online, up to 6 months.
   */
  last_online_time: number | null;
  /**
   * The advertiser's displayed name.
   */
  name: string;
  /**
   * Average rating of the advertiser, range is 1-5.
   */
  rating_average: null | number;
  /**
   * Number of ratings given to the advertiser.
   */
  rating_count: number;
  /**
   * Percentage of users who have recommended the advertiser.
   */
  recommended_average: null | number;
  /**
   * Number of times the advertiser has been recommended.
   */
  recommended_count: number | null;
  /**
   * The percentage of successfully completed orders made by or placed against the advertiser within the past 30 days.
   */
  total_completion_rate: null | number;
}
/**
 * For subscription requests only.
 */
export interface SubscriptionInformation {
  /**
   * A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.
   */
  id: string;
}
/**
 * Creates a P2P (Peer to Peer) advert. Can only be used by an approved P2P advertiser.
 */
export interface P2PAdvertCreateRequest {
  /**
   * Must be 1
   */
  p2p_advert_create: 1;
  /**
   * The total amount of the advert, in advertiser's account currency.
   */
  amount: number;
  /**
   * [Optional] Indicates if this is block trade ad or not. Default: 0.
   */
  block_trade?: 0 | 1;
  /**
   * [Optional] Advertiser contact information.
   */
  contact_info?: string;
  /**
   * [Optional] General information about the advert.
   */
  description?: string;
  /**
   * [Optional] 2 letter country codes. Counterparties who do not live in these countries will not be allowed to place orders against the advert.
   *
   * @maxItems 250
   */
  eligible_countries?: string[];
  /**
   * [Optional] Local currency for this advert. If not provided, will use the currency of client's residence by default.
   */
  local_currency?: string;
  /**
   * Maximum allowed amount for the orders of this advert, in advertiser's `account_currency`. Should be more than or equal to `min_order_amount`
   */
  max_order_amount: number;
  /**
   * [Optional] Counterparties who have a 30 day completion rate less than this value will not be allowed to place orders against the advert.
   */
  min_completion_rate?: number;
  /**
   * [Optional] Counterparties who joined less than this number of days ago will not be allowed to place orders against the advert.
   */
  min_join_days?: number;
  /**
   * Minimum allowed amount for the orders of this advert, in advertiser's `account_currency`. Should be less than or equal to `max_order_amount`.
   */
  min_order_amount: number;
  /**
   * [Optional] Counterparties who have an average rating less than this value will not be allowed to place orders against the advert.
   */
  min_rating?: number;
  /**
   * [Optional] Expiry period (seconds) for order created against this ad.
   */
  order_expiry_period?: number;
  /**
   * [Optional] Payment instructions.
   */
  payment_info?: string;
  /**
   * [Optional] Payment method name (deprecated).
   */
  payment_method?: string;
  /**
   * IDs of previously saved payment methods as returned from p2p_advertiser_payment_methods, only applicable for sell ads.
   *
   * @maxItems 3
   */
  payment_method_ids?: [] | [number] | [number, number] | [number, number, number];
  /**
   * Payment method identifiers as returned from p2p_payment_methods, only applicable for buy ads.
   *
   * @maxItems 3
   */
  payment_method_names?: [] | [string] | [string, string] | [string, string, string];
  /**
   * Conversion rate from advertiser's account currency to `local_currency`. An absolute rate value (fixed), or percentage offset from current market rate (floating).
   */
  rate: number;
  /**
   * Type of rate, fixed or floating.
   */
  rate_type?: "fixed" | "float";
  /**
   * The advertisement represents the intention to perform this action on your Deriv account funds.
   */
  type: "buy" | "sell";
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Returns the information of the created  P2P (Peer to Peer) advert.
 */
export interface P2PAdvertCreateResponse {
  p2p_advert_create?: P2PAdvertCreate;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "p2p_advert_create";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * The information of the created P2P advert.
 */
export interface P2PAdvertCreate {
  /**
   * Currency for this advert. This is the system currency to be transferred between advertiser and client.
   */
  account_currency: string;
  /**
   * The number of active orders against this advert.
   */
  active_orders: number;
  advertiser_details: AdvertiserDetails;
  /**
   * The total amount specified in advert, in `account_currency`.
   */
  amount: number;
  /**
   * The total amount specified in advert, in `account_currency`, formatted to appropriate decimal places.
   */
  amount_display: string;
  /**
   * Indicates if this is block trade advert or not.
   */
  block_trade: 0 | 1;
  /**
   * Advertiser contact information. Only applicable for 'sell adverts'.
   */
  contact_info?: string;
  /**
   * Type of transaction from the opposite party's perspective.
   */
  counterparty_type: "buy" | "sell";
  /**
   * The target country code of the advert.
   */
  country: string;
  /**
   * The advert creation time in epoch.
   */
  created_time: number;
  /**
   * General information about the advert.
   */
  description: string;
  /**
   * Conversion rate from account currency to local currency, using current market rate if applicable.
   */
  effective_rate: null | number;
  /**
   * Conversion rate from account currency to local currency, using current market rate if applicable, formatted to appropriate decimal places.
   */
  effective_rate_display: null | string;
  /**
   * 2 letter country codes. Counterparties who do not live in these countries are not allowed to place orders against this advert.
   */
  eligible_countries?: string[];
  /**
   * The unique identifier for this advert.
   */
  id: string;
  /**
   * The activation status of the advert.
   */
  is_active: 0 | 1;
  /**
   * Indicates that this advert will appear on the main advert list.
   */
  is_visible: 0 | 1;
  /**
   * Local currency for this advert. This is the form of payment to be arranged directly between advertiser and client.
   */
  local_currency: string;
  /**
   * Maximum order amount specified in advert, in `account_currency`.
   */
  max_order_amount: number;
  /**
   * Maximum order amount specified in advert, in `account_currency`, formatted to appropriate decimal places.
   */
  max_order_amount_display: string;
  /**
   * Maximum order amount at this time, in `account_currency`.
   */
  max_order_amount_limit: number;
  /**
   * Maximum order amount at this time, in `account_currency`, formatted to appropriate decimal places.
   */
  max_order_amount_limit_display: string;
  /**
   * Counterparties who have a 30 day completion rate less than this value are not allowed to place orders against this advert.
   */
  min_completion_rate?: number;
  /**
   * Counterparties who joined less than this number of days ago are not allowed to place orders against this advert.
   */
  min_join_days?: number;
  /**
   * Minimum order amount specified in advert, in `account_currency`.
   */
  min_order_amount: number;
  /**
   * Minimum order amount specified in advert, in `account_currency`, formatted to appropriate decimal places.
   */
  min_order_amount_display: string;
  /**
   * Minimum order amount at this time, in `account_currency`.
   */
  min_order_amount_limit: number;
  /**
   * Minimum order amount at this time, in `account_currency`, formatted to appropriate decimal places.
   */
  min_order_amount_limit_display: string;
  /**
   * Counterparties who have an average rating less than this value are not allowed to place orders against this advert.
   */
  min_rating?: number;
  /**
   * Expiry period (seconds) for order created against this ad.
   */
  order_expiry_period: number;
  /**
   * Payment instructions. Only applicable for 'sell adverts'.
   */
  payment_info?: string;
  /**
   * Payment method name (deprecated).
   */
  payment_method: null | string;
  /**
   * Details of available payment methods (sell adverts only).
   */
  payment_method_details?: {
    /**
     * Unique identifier.
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[0-9]{1,8}$".
     */
    [k: string]: {
      /**
       * Display name of payment method.
       */
      display_name?: string;
      /**
       * Payment method fields.
       */
      fields: {
        /**
         * Field identifier.
         *
         * This interface was referenced by `undefined`'s JSON-Schema definition
         * via the `patternProperty` "^[a-z0-9_]{1,30}$".
         */
        [k: string]: {
          /**
           * Display name of payment method field.
           */
          display_name: string;
          /**
           * Is field required or optional.
           */
          required: number;
          /**
           * Field type.
           */
          type: "text" | "memo";
          /**
           * Current value of payment method field.
           */
          value: string;
        };
      };
      /**
       * Indicates whether method is enabled.
       */
      is_enabled: 0 | 1;
      /**
       * Payment method identifier.
       */
      method: string;
      /**
       * Payment method type.
       */
      type: "bank" | "ewallet" | "other";
      /**
       * IDs of adverts that use this payment method.
       */
      used_by_adverts: string[] | null;
      /**
       * IDs of orders that use this payment method.
       */
      used_by_orders: string[] | null;
    };
  };
  /**
   * Names of supported payment methods.
   */
  payment_method_names?: string[];
  /**
   * Cost of the advert in local currency.
   */
  price: null | number;
  /**
   * Cost of the advert in local currency, formatted to appropriate decimal places.
   */
  price_display: null | string;
  /**
   * Conversion rate from advertiser's account currency to `local_currency`. An absolute rate value (fixed), or percentage offset from current market rate (floating).
   */
  rate: number;
  /**
   * Conversion rate formatted to appropriate decimal places.
   */
  rate_display: string;
  /**
   * Type of rate, fixed or floating.
   */
  rate_type: "fixed" | "float";
  /**
   * Amount currently available for orders, in `account_currency`.
   */
  remaining_amount: number;
  /**
   * Amount currently available for orders, in `account_currency`, formatted to appropriate decimal places.
   */
  remaining_amount_display: string;
  /**
   * The type of advertisement in relation to the advertiser's Deriv account.
   */
  type: "buy" | "sell";
  /**
   * Reasons why an advert is not visible. Possible values:
   * - `advert_fixed_rate_disabled`: fixed rate adverts are no longer available in the advert's country.
   * - `advert_float_rate_disabled`: floating rate adverts are no longer available in the advert's country.
   * - `advert_inactive`: the advert is set inactive.
   * - `advert_max_limit`: the minimum order amount exceeds the system maximum order.
   * - `advert_min_limit`: the maximum order amount is too small to be shown on the advert list.
   * - `advert_remaining`: the remaining amount of the advert is below the minimum order.
   * - `advert_no_payment_methods`: the advert has no valid payment methods.
   * - `advertiser_ads_paused`: the advertiser has paused all adverts.
   * - `advertiser_approval`: the advertiser's proof of identity is not verified.
   * - `advertiser_balance`: the advertiser's P2P balance is less than the minimum order.
   * - `advertiser_schedule`: the advertiser's schedule does not have availability between now and now + order_expiry_period.
   * - `advertiser_block_trade_ineligible`: the advertiser is not currently eligible for block trading.
   * - `advertiser_daily_limit`: the advertiser's remaining daily limit is less than the minimum order.
   * - `advertiser_temp_ban`: the advertiser is temporarily banned from P2P.
   */
  visibility_status?: (
    | "advert_fixed_rate_disabled"
    | "advert_float_rate_disabled"
    | "advert_inactive"
    | "advert_max_limit"
    | "advert_min_limit"
    | "advert_remaining"
    | "advert_no_payment_methods"
    | "advertiser_ads_paused"
    | "advertiser_approval"
    | "advertiser_balance"
    | "advertiser_block_trade_ineligible"
    | "advertiser_daily_limit"
    | "advertiser_schedule"
    | "advertiser_temp_ban"
  )[];
}
/**
 * Details of the advertiser for this advert.
 */
export interface AdvertiserDetails {
  /**
   * The total number of orders completed in the past 30 days.
   */
  completed_orders_count: number;
  /**
   * The advertiser's first name.
   */
  first_name?: string;
  /**
   * The advertiser's unique identifier.
   */
  id: string;
  /**
   * Indicates if the advertiser is currently online.
   */
  is_online: 0 | 1;
  /**
   * Inidcates whether the advertiser's schedule has availability between now and now + order_expiry_period.
   */
  is_schedule_available: 0 | 1;
  /**
   * The advertiser's last name.
   */
  last_name?: string;
  /**
   * Epoch of the latest time the advertiser was online, up to 6 months.
   */
  last_online_time: number | null;
  /**
   * The advertiser's displayed name.
   */
  name: string;
  /**
   * Average rating of the advertiser, range is 1-5.
   */
  rating_average: null | number;
  /**
   * Number of ratings given to the advertiser.
   */
  rating_count: number;
  /**
   * Percentage of users who have recommended the advertiser.
   */
  recommended_average: null | number;
  /**
   * Number of times the advertiser has been recommended.
   */
  recommended_count: number | null;
  /**
   * The percentage of successfully completed orders made by or placed against the advertiser within the past 30 days.
   */
  total_completion_rate: null | number;
}
/**
 * List all my used OAuth applications.
 */
export interface OAuthApplicationsRequest {
  /**
   * Must be `1`
   */
  oauth_apps: 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * List of 3rd party OAuth applications that used for the authorized account.
 */
export type OauthApps = ApplicationObject[];

/**
 * A message with used applications
 */
export interface OAuthApplicationsResponse {
  oauth_apps?: OauthApps;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "oauth_apps";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
export interface ApplicationObject {
  /**
   * Application ID.
   */
  app_id: number;
  /**
   * Markup added to contract prices (as a percentage of contract payout)
   */
  app_markup_percentage: number;
  /**
   * The last date which the application has been used.
   */
  last_used: null | string;
  /**
   * Application name
   */
  name: string;
  /**
   * Boolean value: 1 or 0, indicating 1 if app is an official app and 0 incase of unofficial app
   */
  official: 1 | 0;
  /**
   * The list of permission scopes grant for each app.
   */
  scopes?: string[];
}
/**
 * Create a new virtual-money account.
 */
export interface NewVirtualMoneyAccountRequest {
  /**
   * Must be `1`
   */
  new_account_virtual: 1;
  /**
   * [Optional] Affiliate token, within 100 characters.
   */
  affiliate_token?: string;
  /**
   * Password (Accepts any printable ASCII character. Must be within 8-25 characters, and include numbers, lowercase and uppercase letters. Must not be the same as the user's email address).
   */
  client_password?: string;
  /**
   * [Optional] Date of first contact, format: `yyyy-mm-dd` in GMT timezone.
   */
  date_first_contact?: string;
  /**
   * [Optional] Email address for signup.
   */
  email?: string;
  /**
   * [Optional] Boolean value: 1 or 0, indicating whether the client has given consent for marketing emails.
   */
  email_consent?: 1 | 0;
  /**
   * [Optional] Google Click Identifier to track source.
   */
  gclid_url?: string;
  /**
   * 2-letter country code (obtained from `residence_list` call).
   */
  residence?: string;
  /**
   * [Optional] Show whether user has used mobile or desktop.
   */
  signup_device?: "desktop" | "mobile";
  /**
   * Account type
   */
  type?: "trading" | "wallet" | "dynamic";
  /**
   * [Optional] Identifier of particular ad. Value must match Regex pattern to be recorded
   */
  utm_ad_id?: string;
  /**
   * [Optional] Identifier of ad group in the campaign. Value must match Regex pattern to be recorded
   */
  utm_adgroup_id?: string;
  /**
   * [Optional] Unique identifier of click on AdRoll ads platform. Value must match Regex pattern to be recorded
   */
  utm_adrollclk_id?: string;
  /**
   * [Optional] Identifies a specific product promotion or strategic campaign such as a spring sale or other promotions. Value must match Regex pattern to be recorded
   */
  utm_campaign?: string;
  /**
   * [Optional] Identifier of paid ad campaign. Value must match Regex pattern to be recorded
   */
  utm_campaign_id?: string;
  /**
   * [Optional] Used to differentiate similar content, or links within the same ad. Value must match Regex pattern to be recorded
   */
  utm_content?: string;
  /**
   * [Optional] Unique identifier of click on Facebook ads platform. Value must match Regex pattern to be recorded
   */
  utm_fbcl_id?: string;
  /**
   * [Optional] Unique visitor identifier on Google Ads platform. Value must match Regex pattern to be recorded
   */
  utm_gl_client_id?: string;
  /**
   * [Optional] Identifies the medium the link was used upon such as: email, CPC, or other methods of sharing. Value must match Regex pattern to be recorded
   */
  utm_medium?: string;
  /**
   * [Optional] Unique click identifier on Microsoft Bing ads platform. Value must match Regex pattern to be recorded
   */
  utm_msclk_id?: string;
  /**
   * [Optional] Identifies the source of traffic such as: search engine, newsletter, or other referral. Value must match Regex pattern to be recorded
   */
  utm_source?: string;
  /**
   * [Optional] Used to send information related to the campaign term like paid search keywords. Value must match Regex pattern to be recorded
   */
  utm_term?: string;
  /**
   * Email verification code (received from a `verify_email` call, which must be done first).
   */
  verification_code?: string;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Create virtual-money account
 */
export interface NewVirtualMoneyAccountResponse {
  new_account_virtual?: NewAccountVirtual;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "new_account_virtual";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * New virtual-money account details
 */
export interface NewAccountVirtual {
  /**
   * Account balance
   */
  balance: number;
  /**
   * ID of the new virtual-money account
   */
  client_id: string;
  /**
   * Account currency
   */
  currency: string;
  /**
   * Currency type against the currency
   */
  currency_type?: string;
  /**
   * Email of the new virtual-money account
   */
  email: string;
  /**
   * Oauth token for the client's login session (so that the user may be logged in immediately)
   */
  oauth_token: string;
  /**
   * Refresh token to perform PTA, only for the first ever created account
   */
  refresh_token?: string;
  /**
   * Account type
   */
  type?: "trading" | "wallet";
}
/**
 * This call opens a new real-money account. This call can be made from a virtual-money or a real-money account. If it is the latter, client information fields in this call will be ignored and data from your existing real-money account will be used.
 */
export interface NewRealMoneyAccountDefaultLandingCompanyRequest {
  /**
   * Must be `1`
   */
  new_account_real: 1;
  /**
   * [Optional] Purpose and reason for requesting the account opening.
   */
  account_opening_reason?: "Speculative" | "Income Earning" | "Hedging" | "Peer-to-peer exchange";
  /**
   * [Optional] The anticipated account turnover.
   */
  account_turnover?:
    | "Less than $25,000"
    | "$25,000 - $50,000"
    | "$50,001 - $100,000"
    | "$100,001 - $500,000"
    | "Over $500,000";
  /**
   * [Optional] Within 100 characters.
   */
  address_city?: string;
  /**
   * Within 70 characters, with no leading whitespaces and may contain letters/numbers and/or any of following characters '.,:;()@#/-
   */
  address_line_1?: string;
  /**
   * [Optional] Within 70 characters.
   */
  address_line_2?: string;
  /**
   * [Optional] Within 20 characters and may not contain '+'.
   */
  address_postcode?: string;
  /**
   * [Optional] Possible value receive from `states_list` call.
   */
  address_state?: string;
  /**
   * [Optional] Affiliate token, within 32 characters.
   */
  affiliate_token?: string;
  /**
   * [Optional] Country of legal citizenship, 2-letter country code.
   */
  citizen?: null | string;
  /**
   * [Optional] Indicates whether this is for a client requesting an account with professional status.
   */
  client_type?: "professional" | "retail";
  /**
   * [Optional] To set currency of the account. List of supported currencies can be acquired with `payout_currencies` call.
   */
  currency?: string;
  /**
   * Date of birth format: `yyyy-mm-dd`.
   */
  date_of_birth?: string;
  /**
   * Employment Status.
   */
  employment_status?: "Employed" | "Pensioner" | "Self-Employed" | "Student" | "Unemployed";
  /**
   * [Optional] Indicates client's self-declaration of FATCA.
   */
  fatca_declaration?: 0 | 1;
  /**
   * Within 1-50 characters, use only letters, spaces, hyphens, full-stops or apostrophes.
   */
  first_name?: string;
  /**
   * Within 1-50 characters, use only letters, spaces, hyphens, full-stops or apostrophes.
   */
  last_name?: string;
  /**
   * [Optional] Indicates client's self-declaration of not being a PEP/RCA (Politically Exposed Person/Relatives and Close Associates).
   */
  non_pep_declaration?: number;
  /**
   * [Optional] Starting with `+` followed by 9-35 digits, hyphens or space.
   */
  phone?: null | string;
  /**
   * [Optional] Place of birth, 2-letter country code.
   */
  place_of_birth?: string;
  /**
   * 2-letter country code, possible value receive from `residence_list` call.
   */
  residence?: string;
  /**
   * [Optional] Accept any value in enum list.
   */
  salutation?: "Mr" | "Ms" | "Miss" | "Mrs";
  /**
   * [Optional] Answer to secret question, within 4-50 characters. Required for new account and existing client details will be used if client open another account.
   */
  secret_answer?: string;
  /**
   * [Optional] Accept any value in enum list. Required for new account and existing client details will be used if client open another account.
   */
  secret_question?:
    | "Mother's maiden name"
    | "Name of your pet"
    | "Name of first love"
    | "Memorable town/city"
    | "Memorable date"
    | "Favourite dish"
    | "Brand of first car"
    | "Favourite artist";
  /**
   * [Optional] Tax identification number. Only applicable for real money account. Required for `maltainvest` landing company.
   */
  tax_identification_number?: string;
  /**
   * [Optional] Residence for tax purpose. Comma separated iso country code if multiple jurisdictions. Only applicable for real money account. Required for `maltainvest` landing company.
   */
  tax_residence?: string;
  /**
   * [Optional] Whether the client has skipped the TIN form. Only applicable for real money account.
   */
  tin_skipped?: 0 | 1;
  /**
   * The tnc acceptance status of the user.
   */
  tnc_acceptance?: 0 | 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Create real account Receive
 */
export interface NewRealMoneyAccountDefaultLandingCompanyResponse {
  new_account_real?: NewAccountReal;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "new_account_real";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * New real money account details
 */
export interface NewAccountReal {
  /**
   * Client ID of new real money account
   */
  client_id: string;
  /**
   * Currency of an account
   */
  currency?: string;
  /**
   * Currency type against the currency
   */
  currency_type?: string;
  /**
   * Landing company full name
   */
  landing_company: string;
  /**
   * Landing company shortcode
   */
  landing_company_short?: string;
  /**
   * Landing company shortcode
   */
  landing_company_shortcode?: string;
  /**
   * OAuth token for client's login session
   */
  oauth_token: string;
}
/**
 * This call opens a new real-money account with the `maltainvest` Landing Company. This call can be made from a virtual-money account or real-money account at Deriv (Europe) Limited. If it is the latter, client information fields in this call will be ignored and data from your existing real-money account will be used.
 */
export interface NewRealMoneyAccountDerivInvestmentEuropeLtdRequest {
  /**
   * Must be `1`
   */
  new_account_maltainvest: 1;
  /**
   * Show whether client has accepted risk disclaimer.
   */
  accept_risk?: 0 | 1;
  /**
   * [Optional] Purpose and reason for requesting the account opening.
   */
  account_opening_reason?: "Speculative" | "Income Earning" | "Hedging";
  /**
   * [Optional] The anticipated account turnover.
   */
  account_turnover?:
    | "Less than $25,000"
    | "$25,000 - $50,000"
    | "$50,001 - $100,000"
    | "$100,001 - $500,000"
    | "Over $500,000";
  /**
   * Within 100 characters
   */
  address_city: string;
  /**
   * Within 70 characters, with no leading whitespaces and may contain letters/numbers and/or any of following characters '.,:;()@#/-
   */
  address_line_1: string;
  /**
   * [Optional] Within 70 characters.
   */
  address_line_2?: string;
  /**
   * [Optional] Within 20 characters and may not contain '+'.
   */
  address_postcode?: string;
  /**
   * [Optional] Possible value receive from `states_list` call.
   */
  address_state?: string;
  /**
   * [Optional] Affiliate token, within 32 characters.
   */
  affiliate_token?: string;
  /**
   * How much experience do you have in CFD trading?
   */
  cfd_experience?: "No experience" | "Less than a year" | "1 - 2 years" | "Over 3 years";
  /**
   * How many CFD trades have you placed in the past 12 months?
   */
  cfd_frequency?:
    | "No transactions in the past 12 months"
    | "1 - 5 transactions in the past 12 months"
    | "6 - 10 transactions in the past 12 months"
    | "11 - 39 transactions in the past 12 months"
    | "40 transactions or more in the past 12 months";
  /**
   * In your understanding, CFD trading allows you to:
   */
  cfd_trading_definition?:
    | "Purchase shares of a company or physical commodities."
    | "Place a bet on the price movement."
    | "Speculate on the price movement."
    | "Make a long-term investment.";
  /**
   * [Optional] Country of legal citizenship, 2-letter country code. Possible value receive from `residence_list` call.
   */
  citizen?: string;
  /**
   * [Optional] Indicates whether this is for a client requesting an account with professional status.
   */
  client_type?: "professional" | "retail";
  /**
   * [Optional] To set currency of the account. List of supported currencies can be acquired with `payout_currencies` call.
   */
  currency?: string;
  /**
   * Date of birth format: yyyy-mm-dd.
   */
  date_of_birth: string;
  /**
   * Level of Education
   */
  education_level?: "Primary" | "Secondary" | "Tertiary";
  /**
   * Industry of Employment.
   */
  employment_industry?:
    | "Construction"
    | "Education"
    | "Finance"
    | "Health"
    | "Tourism"
    | "Information & Communications Technology"
    | "Science & Engineering"
    | "Legal"
    | "Social & Cultural"
    | "Agriculture"
    | "Real Estate"
    | "Food Services"
    | "Manufacturing"
    | "Unemployed";
  /**
   * Employment Status.
   */
  employment_status: "Employed" | "Pensioner" | "Self-Employed" | "Student" | "Unemployed";
  /**
   * Estimated Net Worth.
   */
  estimated_worth?:
    | "Less than $100,000"
    | "$100,000 - $250,000"
    | "$250,001 - $500,000"
    | "$500,001 - $1,000,000"
    | "Over $1,000,000";
  /**
   * [Optional] Indicates client's self-declaration of FATCA.
   */
  fatca_declaration?: 0 | 1;
  /**
   * Within 1-50 characters, use only letters, spaces, hyphens, full-stops or apostrophes.
   */
  first_name: string;
  /**
   * Income Source.
   */
  income_source?:
    | "Salaried Employee"
    | "Self-Employed"
    | "Investments & Dividends"
    | "Pension"
    | "State Benefits"
    | "Savings & Inheritance";
  /**
   * Within 1-50 characters, use only letters, spaces, hyphens, full-stops or apostrophes.
   */
  last_name: string;
  /**
   * How does leverage affect CFD trading?
   */
  leverage_impact_trading?:
    | "Leverage is a risk mitigation technique."
    | "Leverage prevents you from opening large positions."
    | "Leverage guarantees profits."
    | "Leverage lets you open larger positions for a fraction of the trade's value.";
  /**
   * Leverage trading is high-risk, so it's a good idea to use risk management features such as stop loss. Stop loss allows you to
   */
  leverage_trading_high_risk_stop_loss?:
    | "Cancel your trade at any time within a chosen timeframe."
    | "Close your trade automatically when the loss is more than or equal to a specific amount."
    | "Close your trade automatically when the profit is more than or equal to a specific amount."
    | "Make a guaranteed profit on your trade.";
  /**
   * Net Annual Income.
   */
  net_income?:
    | "Less than $25,000"
    | "$25,000 - $50,000"
    | "$50,001 - $100,000"
    | "$100,001 - $500,000"
    | "Over $500,000";
  /**
   * [Optional] Indicates client's self-declaration of not being a PEP/RCA.
   */
  non_pep_declaration?: number;
  /**
   * Occupation.
   */
  occupation?:
    | "Chief Executives, Senior Officials and Legislators"
    | "Managers"
    | "Professionals"
    | "Clerks"
    | "Personal Care, Sales and Service Workers"
    | "Agricultural, Forestry and Fishery Workers"
    | "Craft, Metal, Electrical and Electronics Workers"
    | "Plant and Machine Operators and Assemblers"
    | "Cleaners and Helpers"
    | "Mining, Construction, Manufacturing and Transport Workers"
    | "Armed Forces"
    | "Government Officers"
    | "Students"
    | "Unemployed";
  /**
   * [Optional] Starting with `+` followed by 9-35 digits, hyphens or space.
   */
  phone?: null | string;
  /**
   * [Optional] Place of birth, 2-letter country code.
   */
  place_of_birth?: string;
  /**
   * When would you be required to pay an initial margin?
   */
  required_initial_margin?:
    | "When opening a Leveraged CFD trade."
    | "When trading Multipliers."
    | "When buying shares of a company."
    | "All of the above.";
  /**
   * 2-letter country code, possible value receive from `residence_list` call.
   */
  residence: string;
  /**
   * [Optional] Indicates client's self declaration for opening account under own initiative, must be 1
   */
  resident_self_declaration?: 1;
  /**
   * Do you understand that you could potentially lose 100% of the money you use to trade?
   */
  risk_tolerance?: "Yes" | "No";
  /**
   * Accept any value in enum list.
   */
  salutation: "Mr" | "Ms" | "Miss" | "Mrs";
  /**
   * [Optional] Answer to secret question, within 4-50 characters.
   */
  secret_answer?: string;
  /**
   * [Optional] Accept any value in enum list.
   */
  secret_question?:
    | "Mother's maiden name"
    | "Name of your pet"
    | "Name of first love"
    | "Memorable town/city"
    | "Memorable date"
    | "Favourite dish"
    | "Brand of first car"
    | "Favourite artist";
  /**
   * How much knowledge and experience do you have in relation to online trading?
   */
  source_of_experience?:
    | "I have an academic degree, professional certification, and/or work experience."
    | "I trade forex CFDs and other complex financial instruments."
    | "I have attended seminars, training, and/or workshops."
    | "I have little experience."
    | "I have no knowledge.";
  /**
   * [Optional] Source of wealth.
   */
  source_of_wealth?:
    | "Accumulation of Income/Savings"
    | "Cash Business"
    | "Company Ownership"
    | "Divorce Settlement"
    | "Inheritance"
    | "Investment Income"
    | "Sale of Property";
  /**
   * Tax identification number. Only applicable for real money account. Required for `maltainvest` landing company.
   */
  tax_identification_number?: string;
  /**
   * Residence for tax purpose. Comma separated iso country code if multiple jurisdictions. Only applicable for real money account. Required for `maltainvest` landing company.
   */
  tax_residence: string;
  /**
   * [Optional] Whether the client has skipped the TIN form. Only applicable for real money account.
   */
  tin_skipped?: 0 | 1;
  /**
   * The tnc acceptance status of the user.
   */
  tnc_acceptance?: 0 | 1;
  /**
   * How much experience do you have with other financial instruments?
   */
  trading_experience_financial_instruments?: "No experience" | "Less than a year" | "1 - 2 years" | "Over 3 years";
  /**
   * How many trades have you placed with other financial instruments in the past 12 months?
   */
  trading_frequency_financial_instruments?:
    | "No transactions in the past 12 months"
    | "1 - 5 transactions in the past 12 months"
    | "6 - 10 transactions in the past 12 months"
    | "11 - 39 transactions in the past 12 months"
    | "40 transactions or more in the past 12 months";
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Create maltainvest account Receive
 */
export interface NewRealMoneyAccountDerivInvestmentEuropeLtdResponse {
  new_account_maltainvest?: NewAccountMaltainvest;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "new_account_maltainvest";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * New `maltainvest` account details
 */
export interface NewAccountMaltainvest {
  /**
   * Client ID of new `maltainvest` account
   */
  client_id: string;
  /**
   * Currency of an account
   */
  currency?: string;
  /**
   * Currency type against the currency
   */
  currency_type?: string;
  /**
   * Landing company full name
   */
  landing_company: string;
  /**
   * Landing company shortcode
   */
  landing_company_short?: string;
  /**
   * Landing company shortcode
   */
  landing_company_shortcode?: string;
  /**
   * OAuth token for client's login session
   */
  oauth_token: string;
}
/**
 * This call allows withdrawal from MT5 account to Binary account.
 */
export interface MT5WithdrawalRequest {
  /**
   * Must be `1`
   */
  mt5_withdrawal: 1;
  /**
   * Amount to withdraw (in the currency of the MT5 account); min = $1 or an equivalent amount, max = $20000 or an equivalent amount.
   */
  amount: number;
  /**
   * MT5 account login to withdraw money from
   */
  from_mt5: string;
  /**
   * Binary account loginid to transfer money to
   */
  to_binary: string;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * `1` on success
 */
export type Mt5Withdrawal = number;

/**
 * The result of MT5 withdrawal request made.
 */
export interface MT5WithdrawalResponse {
  mt5_withdrawal?: Mt5Withdrawal;
  /**
   * Deposit reference ID of Binary account.
   */
  binary_transaction_id?: number;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "mt5_withdrawal";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * To reset the password of MT5 account.
 */
export interface MT5PasswordResetRequest {
  /**
   * Must be `1`
   */
  mt5_password_reset: 1;
  /**
   * MT5 user login
   */
  login: string;
  /**
   * New password of the account. For validation (Accepts any printable ASCII character. Must be within 8-25 characters, and include numbers, lowercase and uppercase letters. Must not be the same as the user's email address).
   */
  new_password: string;
  /**
   * [Optional] Type of the password to reset.
   */
  password_type?: "main" | "investor";
  /**
   * Email verification code (received from a `verify_email` call, which must be done first)
   */
  verification_code: string;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * `1` on success
 */
export type Mt5PasswordReset = number;

/**
 * MT5 user password reset receive
 */
export interface MT5PasswordResetResponse {
  mt5_password_reset?: Mt5PasswordReset;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "mt5_password_reset";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * This call validates the main password for the MT5 user
 */
export interface MT5PasswordCheckRequest {
  /**
   * Must be `1`
   */
  mt5_password_check: 1;
  /**
   * MT5 user login
   */
  login: string;
  /**
   * The password of the account.
   */
  password: string;
  /**
   * [Optional] Type of the password to check.
   */
  password_type?: "main" | "investor";
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * `1` on success
 */
export type Mt5PasswordCheck = number;

/**
 * MT5 user password check receive
 */
export interface MT5PasswordCheckResponse {
  mt5_password_check?: Mt5PasswordCheck;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "mt5_password_check";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * To change passwords of the MT5 account.
 */
export interface MT5PasswordChangeRequest {
  /**
   * Must be `1`
   */
  mt5_password_change: 1;
  /**
   * MT5 user login
   */
  login: string;
  /**
   * New password of the account. For validation (Accepts any printable ASCII character. Must be within 8-25 characters, and include numbers, lowercase and uppercase letters. Must not be the same as the user's email address).
   */
  new_password: string;
  /**
   * Old password for validation (non-empty string, accepts any printable ASCII character)
   */
  old_password: string;
  /**
   * [Optional] Type of the password to change.
   */
  password_type?: "main" | "investor";
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * `1` on success
 */
export type Mt5PasswordChange = number;

/**
 * MT5 user password change receive
 */
export interface MT5PasswordChangeResponse {
  mt5_password_change?: Mt5PasswordChange;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "mt5_password_change";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * This call creates new MT5 user, either demo or real money user.
 */
export interface MT5NewAccountRequest {
  /**
   * Must be `1`
   */
  mt5_new_account: 1;
  /**
   * Account type. If set to 'financial', setting 'mt5_account_type' is also required.
   */
  account_type: "demo" | "gaming" | "financial" | "all";
  /**
   * [Optional] The address of the user. The maximum length of this address field is 128 characters.
   */
  address?: string;
  /**
   * [Optional] User's city of residence.
   */
  city?: string;
  /**
   * [Optional] Name of the client's company. The maximum length of the company name is 64 characters.
   */
  company?: string;
  /**
   * [Optional] 2-letter country code (value received from `residence_list` call).
   */
  country?: string;
  /**
   * [Optional] MT5 account currency, the default value will be the qualified account currency.
   */
  currency?: string;
  /**
   * [Optional] If set to 1, only validation is performed.
   */
  dry_run?: 0 | 1;
  /**
   * Email address
   */
  email: string;
  /**
   * [Optional] The investor password of the account. For validation (Accepts any printable ASCII character. Must be within 8-25 characters, and include numbers, lowercase and uppercase letters. Must not be the same as the user's email address).
   */
  investPassword?: string;
  /**
   * Client leverage (from 1 to 1000).
   */
  leverage: number;
  /**
   * The master password of the account. For validation (Accepts any printable ASCII character. Must be within 8-25 characters, and include numbers, lowercase and uppercase letters. Must not be the same as the user's email address). This field is required.
   */
  mainPassword: string;
  /**
   * [Optional] Indicates whether the user would like to migrate his account to other jurisdiction.
   */
  migrate?: boolean;
  /**
   * [Optional] To choose whether account is conventional or swap_free. Unavailable for financial_stp MT5_account_type
   */
  mt5_account_category?: "conventional" | "swap_free";
  /**
   * [Optional] Financial: Variable spreads, High leverage. Financial STP: Variable spreads, Medium Leverage, more products. If 'account_type' set to 'financial', setting 'mt5_account_type' is also required.
   */
  mt5_account_type?: "financial" | "financial_stp";
  /**
   * Client's name. The maximum length here is 101 characters.
   */
  name: string;
  /**
   * [Optional] User's phone number.
   */
  phone?: null | string;
  /**
   * [Optional] The user's phone password.
   */
  phonePassword?: string;
  /**
   * Product name that Deriv offer
   */
  product?: "" | "synthetic" | "financial" | "swap_free" | "zero_spread" | "standard" | "stp";
  /**
   * [Optional] Trade server.
   */
  server?: null | ("p01_ts01" | "p01_ts02" | "p01_ts03" | "p01_ts04" | "p02_ts02" | "p03_ts01" | "p03_ts02");
  /**
   * [Optional] User's state (region) of residence.
   */
  state?: string;
  /**
   * [Optional] Indicate the additional risk management for each account
   */
  sub_account_category?: "" | "swap_free" | "ab" | "ba" | "lim" | "hr";
  /**
   * [Optional] Indicate the different offerings for mt5 account
   */
  sub_account_type?: "standard" | "stp" | "ibt" | "swap_free" | "zero_spread";
  /**
   * [Optional] User's zip code.
   */
  zipCode?: string;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Create MT5 account Receive
 */
export interface MT5NewAccountResponse {
  mt5_new_account?: Mt5NewAccount;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "mt5_new_account";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * New MT5 account details
 */
export interface Mt5NewAccount {
  /**
   * Account type.
   */
  account_type?: "demo" | "gaming" | "financial" | "all";
  /**
   * Agent Details.
   */
  agent?: null | string;
  /**
   * Account balance.
   */
  balance?: number;
  /**
   * MT5 account currency (`USD` or `EUR`) that depends on the MT5 company (`vanuatu`, `svg`, `malta`).
   */
  currency?: string;
  /**
   * Account balance, formatted to appropriate decimal places.
   */
  display_balance?: string;
  /**
   * Login ID of the user's new MT5 account. Login could have 2 types of prefixes: MTD, MTR. MTD - for demo accounts and MTR for real money accounts.
   */
  login?: string;
  /**
   * With default value of conventional, unavailable for `financial_stp` sub account type.
   */
  mt5_account_category?: "conventional" | "swap_free";
  /**
   * Sub account type for classic MT5 account.
   */
  mt5_account_type?: "financial" | "financial_stp" | "standard";
  /**
   * Product name that Deriv offer
   */
  product?: "" | "synthetic" | "financial" | "swap_free" | "zero_spread" | "standard" | "stp";
  /**
   * Indicate the different offerings for mt5 account.
   */
  sub_account_type?: "standard" | "stp" | "ibt" | "swap_free" | "zero_spread";
}
/**
 * Get list of MT5 accounts for client
 */
export interface MT5AccountsListRequest {
  /**
   * Must be `1`
   */
  mt5_login_list: 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Array containing MT5 account objects.
 */
export type Mt5LoginList = DetailsOfEachMT5Loginid[];

/**
 * Get list of MT5 accounts for client.
 */
export interface MT5AccountsListResponse {
  mt5_login_list?: Mt5LoginList;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "mt5_login_list";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
export interface DetailsOfEachMT5Loginid {
  /**
   * Account type.
   */
  account_type?: "demo" | "real";
  /**
   * Balance of the MT5 account.
   */
  balance?: number;
  /**
   * [Optional] Pertains to client KYC. Returned only if the client fails to meet the requirements, including proof of identity (POI), validity of the tax identification number (TIN), and proof of address (POA).
   */
  client_kyc_status?: {
    /**
     * Status of proof of address (POA).
     */
    poa_status?: "none" | "pending" | "expired" | "verified" | "rejected";
    /**
     * Status of proof of identity (POI).
     */
    poi_status?: "none" | "pending" | "verified" | "suspected" | "rejected" | "expired";
    /**
     * Indicates whether the tax identification number (TIN) is valid (1) or not (0).
     */
    valid_tin?: 1 | 0;
  };
  /**
   * Residence of the MT5 account.
   */
  country?: string;
  /**
   * Currency of the MT5 account.
   */
  currency?: string;
  /**
   * Account balance, formatted to appropriate decimal places.
   */
  display_balance?: string;
  /**
   * [Optional] Determines the eligibility status for migrating a client account based on verification and account type.
   */
  eligible_to_migrate?: {
    [k: string]: unknown;
  };
  /**
   * Email address of the MT5 account.
   */
  email?: string;
  /**
   * Error in MT5 account details.
   */
  error?: {
    /**
     * Error code string.
     */
    code?: string;
    /**
     * Extra information about the error.
     */
    details?: {
      /**
       * MT5 account type.
       */
      account_type?: string;
      /**
       * MT5 account login ID.
       */
      login?: string;
      /**
       * Trade server name of the MT5 account.
       */
      server?: string;
      /**
       * Trade server information.
       */
      server_info?: {
        /**
         * The environment. E.g. Deriv-Server.
         */
        environment?:
          | "Deriv-Demo"
          | "Deriv-Server"
          | "Deriv-Server-02"
          | "Deriv-Server-03"
          | "DerivFX-Server"
          | "DerivFX-Server-02"
          | "DerivFX-Server-03"
          | "DerivVU-Server"
          | "DerivVU-Server-02"
          | "DerivVU-Server-03"
          | "DerivSVG-Server"
          | "DerivSVG-Server-02"
          | "DerivSVG-Server-03"
          | "DerivMT-Server"
          | "DerivMT-Server-02"
          | "DerivMT-Server-03"
          | "DerivBVI-Server"
          | "DerivBVI-Server-02"
          | "DerivBVI-Server-03";
        /**
         * Geographical location of the server.
         */
        geolocation?: {
          /**
           * Internal server grouping.
           */
          group?: string;
          /**
           * Server location.
           */
          location?: string;
          /**
           * Server region.
           */
          region?: string;
          /**
           * Server sequence.
           */
          sequence?: number;
        };
        /**
         * Server id.
         */
        id?: string;
      };
    };
    /**
     * Error message.
     */
    message_to_client?: string;
  };
  /**
   * Group type of the MT5 account, e.g. `demo\svg_financial`
   */
  group?: string;
  /**
   * Indicate if the account is a main agent - an IB account
   */
  is_main_agent?: boolean;
  /**
   * Broker name
   */
  landing_company?: string;
  /**
   * Landing company shortcode of the MT5 account.
   */
  landing_company_short?: "bvi" | "labuan" | "malta" | "maltainvest" | "svg" | "vanuatu" | "seychelles";
  /**
   * Leverage of the MT5 account (1 to 1000).
   */
  leverage?: number;
  /**
   * Login of MT5 account.
   */
  login?: string;
  /**
   * Market type
   */
  market_type?: "financial" | "synthetic" | "all";
  /**
   * Name of the owner of the MT5 account.
   */
  name?: string;
  /**
   * Product name that Deriv offer
   */
  product?: "" | "synthetic" | "financial" | "swap_free" | "zero_spread" | "standard" | "stp";
  /**
   * Timestamp of the latest MT5 request.
   */
  request_timestamp?: number;
  /**
   * Rights assigned to the MT5 account.
   */
  rights?: {
    /**
     * User is allowed to connect via MT5 Web API
     */
    api?: boolean;
    /**
     * This flag is obsolete and not used
     */
    api_deprecated?: boolean;
    /**
     * User's certificate is confirmed
     */
    confirmed?: boolean;
    /**
     * The User is allowed to connect
     */
    enabled?: boolean;
    /**
     * User is not allowed to view reports
     */
    exclude_reports?: boolean;
    /**
     * User is allowed to use Expert Advisors
     */
    expert?: boolean;
    /**
     * For internal mt5 usage
     */
    investor?: boolean;
    /**
     * User is allowed to use OTP
     */
    otp_enabled?: boolean;
    /**
     * User is allowed to change password
     */
    password_change?: boolean;
    /**
     * User has enabled push notifications
     */
    push?: boolean;
    /**
     * Value for internal mt5 usage
     */
    readonly?: boolean;
    /**
     * User is allowed to receive daily reports
     */
    reports?: boolean;
    /**
     * User must change password during next connection
     */
    reset_pass?: boolean;
    /**
     * VPS is enabled for user
     */
    sponsored?: boolean;
    /**
     * User can view technical accounts in manager/admin terminal
     */
    technical?: boolean;
    /**
     * Trading is disabled for user
     */
    trade_disabled?: boolean;
    /**
     * User is allowed to use trailing stops
     */
    trailing?: boolean;
  };
  /**
   * Trade server name of the MT5 account.
   */
  server?: string;
  /**
   * Trade server information.
   */
  server_info?: {
    /**
     * The environment. E.g. Deriv-Server.
     */
    environment?:
      | "Deriv-Demo"
      | "Deriv-Server"
      | "Deriv-Server-02"
      | "Deriv-Server-03"
      | "DerivFX-Server"
      | "DerivFX-Server-02"
      | "DerivFX-Server-03"
      | "DerivVU-Server"
      | "DerivVU-Server-02"
      | "DerivVU-Server-03"
      | "DerivSVG-Server"
      | "DerivSVG-Server-02"
      | "DerivSVG-Server-03"
      | "DerivMT-Server"
      | "DerivMT-Server-02"
      | "DerivMT-Server-03"
      | "DerivBVI-Server"
      | "DerivBVI-Server-02"
      | "DerivBVI-Server-03";
    /**
     * Geographical location of the server.
     */
    geolocation?: {
      /**
       * Internal server grouping.
       */
      group?: string;
      /**
       * Server location.
       */
      location?: string;
      /**
       * Server region.
       */
      region?: string;
      /**
       * Server sequence.
       */
      sequence?: number;
    };
    /**
     * Server id.
     */
    id?: string;
  };
  /**
   * MT5 account status.
   */
  status?: null | string;
  /**
   * Sub account category refer to the additional risk management
   */
  sub_account_category?: "" | "swap_free" | "swap_free_high_risk" | "lim" | "hr" | "ab" | "ba" | "stp";
  /**
   * Sub account type refer to different offerings that we have for mt5
   */
  sub_account_type?: "standard" | "financial" | "financial_stp" | "swap_free" | "ibt" | "stp" | "zero_spread";
  /**
   * MT5 webtrader url for each mt5 platform
   */
  webtrader_url?: string;
  /**
   * Links to access MT5 application for different platforms.
   */
  white_label_links?: {
    /**
     * Download link for Android.
     */
    android?: string;
    /**
     * Download link for iOS.
     */
    ios?: string;
    /**
     * MT5 webtrader url based on jurisdiction and platform
     */
    webtrader_url?: string;
    /**
     * Download link for Windows.
     */
    windows?: string;
  };
}
/**
 * Get MT5 user account settings
 */
export interface MT5GetSettingRequest {
  /**
   * Must be `1`
   */
  mt5_get_settings: 1;
  /**
   * MT5 user login
   */
  login: string;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Get MT5 user settings
 */
export interface MT5GetSettingResponse {
  mt5_get_settings?: Mt5GetSettings;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "mt5_get_settings";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * MT5 user account details
 */
export interface Mt5GetSettings {
  /**
   * Account type.
   */
  account_type?: "demo" | "real";
  /**
   * The address of the user. The maximum length of the address is 128 characters.
   */
  address?: string;
  /**
   * Balance of the Trading account.
   */
  balance?: number;
  /**
   * User's city of residence.
   */
  city?: string;
  /**
   * Name of the client's company. The maximum length of the company name is 64 characters.
   */
  company?: string;
  /**
   * 2-letter country code.
   */
  country?: string;
  /**
   * MT5 account currency (`USD` or `EUR`) that depends on the MT5 company (`vanuatu`, `svg`, `malta`).
   */
  currency?: string;
  /**
   * Account balance, formatted to appropriate decimal places.
   */
  display_balance?: string;
  /**
   * Email address.
   */
  email?: string;
  /**
   * The group where account belongs to.
   */
  group?: string;
  /**
   * Landing company shortcode of the MT5 account.
   */
  landing_company_short?: "bvi" | "labuan" | "malta" | "maltainvest" | "seychelles" | "svg" | "vanuatu";
  /**
   * Client leverage (from 1 to 1000).
   */
  leverage?: number;
  /**
   * Login ID of the user's MT5 account.
   */
  login?: string;
  /**
   * Market type
   */
  market_type?: "all" | "financial" | "synthetic";
  /**
   * Client's name. The maximum length of a client's symbol name is 128 characters.
   */
  name?: string;
  /**
   * User's phone number.
   */
  phone?: string;
  /**
   * The user's phone password.
   */
  phonePassword?: string;
  /**
   * Trade server name of the MT5 account.
   */
  server?: string;
  /**
   * Trade server information.
   */
  server_info?: {
    /**
     * The environment. E.g. Deriv-Server.
     */
    environment?: "Deriv-Demo" | "Deriv-Server" | "Deriv-Server-02" | "Deriv-Server-03";
    /**
     * Geographical location of the server.
     */
    geolocation?: {
      /**
       * Internal server grouping.
       */
      group?: string;
      /**
       * Server location.
       */
      location?: string;
      /**
       * Server region.
       */
      region?: string;
      /**
       * Server sequence.
       */
      sequence?: number;
    };
    /**
     * Server id.
     */
    id?: string;
  };
  /**
   * User's state (region) of residence.
   */
  state?: string;
  /**
   * Sub account category.
   */
  sub_account_category?: "" | "ibt" | "lim" | "stp" | "swap_free" | "swap_free_high_risk";
  /**
   * Sub account type
   */
  sub_account_type?: "standard" | "financial" | "financial_stp" | "swap_free" | "ibt" | "stp" | "zero_spread";
  /**
   * User's zip code.
   */
  zipCode?: string;
}
/**
 * This call allows deposit into MT5 account from Binary account.
 */
export interface MT5DepositRequest {
  /**
   * Must be `1`
   */
  mt5_deposit: 1;
  /**
   * Amount to deposit (in the currency of from_binary); min = $1 or an equivalent amount, max = $20000 or an equivalent amount
   */
  amount?: number;
  /**
   * Binary account loginid to transfer money from
   */
  from_binary?: string;
  /**
   * MT5 account login to deposit money to
   */
  to_mt5: string;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * 1 on success
 */
export type Mt5Deposit = number;

/**
 * The result of MT5 deposit request.
 */
export interface MT5DepositResponse {
  mt5_deposit?: Mt5Deposit;
  /**
   * Withdrawal reference ID of Binary account
   */
  binary_transaction_id?: number;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "mt5_deposit";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Logout the session
 */
export interface LogOutRequest {
  /**
   * Must be `1`
   */
  logout: 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * The result of logout request which is 1
 */
export type Logout = 1;

/**
 * The response of logout request made.
 */
export interface LogOutResponse {
  logout?: Logout;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "logout";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Retrieve a summary of login history for user.
 */
export interface LoginHistoryRequest {
  /**
   * Must be `1`
   */
  login_history: 1;
  /**
   * [Optional] Apply limit to count of login history records.
   */
  limit?: number;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Array of records of client login/logout activities
 */
export type LoginHistory = {
  /**
   * Type of action.
   */
  action: string;
  /**
   * Provides details about browser, device used during login or logout
   */
  environment: string;
  /**
   * Status of activity: 1 - success, 0 - failure
   */
  status: 0 | 1;
  /**
   * Epoch time of the activity
   */
  time: number;
}[];

/**
 * Recent login/logout history records
 */
export interface LoginHistoryResponse {
  login_history?: LoginHistory;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "login_history";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * The company has a number of licensed subsidiaries in various jurisdictions, which are called Landing Companies (and which are wholly owned subsidiaries of the Deriv Group). This call provides information about each Landing Company.
 */
export interface LandingCompanyDetailsRequest {
  /**
   * Landing company shortcode.
   */
  landing_company_details:
    | "iom"
    | "malta"
    | "maltainvest"
    | "svg"
    | "virtual"
    | "vanuatu"
    | "samoa"
    | "samoa-virtual"
    | "dsl"
    | "bvi"
    | "labuan"
    | "dml";
  /**
   * [Optional] Will return an extra field `tin_not_mandatory` indicating if the landing company does not require tax identification number for the provided country.
   */
  country?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * A message with Landing Company.
 */
export interface LandingCompanyDetailsResponse {
  landing_company_details?: LandingCompanyDetails;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "landing_company_details";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * The detailed information of the requested landing company.
 */
// export interface LandingCompanyDetails {
//   /**
//    * Landing Company address.
//    */
//   address?: string[] | null;
//   /**
//    * Special conditions for changing sensitive fields
//    */
//   changeable_fields?: {
//     [k: string]: unknown;
//   };
//   /**
//    * Landing Company country.
//    */
//   country?: string;
//   currency_config?: CurrencyConfigStructure;
//   /**
//    * Flag to indicate whether reality check is applicable for this Landing Company. `1`: applicable, `0`: not applicable. The Reality Check is a feature that gives a summary of the client's trades and account balances on a regular basis throughout his session, and is a regulatory requirement for certain Landing Companies.
//    */
//   has_reality_check?: 0 | 1;
//   /**
//    * Allowed contract types for this Landing Company
//    */
//   legal_allowed_contract_categories?: string[];
//   /**
//    * Allowable currencies for accounts with this Landing Company.
//    */
//   legal_allowed_currencies?: string[];
//   /**
//    * Allowed markets for this Landing Company
//    */
//   legal_allowed_markets?: string[];
//   /**
//    * Default currency of client accounts with this Landing Company.
//    */
//   legal_default_currency?: string;
//   /**
//    * Landing Company name.
//    */
//   name?: string;
//   /**
//    * Legal requirements for the given Landing Company.
//    */
//   requirements?: {
//     /**
//      * After first deposit requirements
//      */
//     after_first_deposit?: {
//       /**
//        * Financial assessment requirements
//        */
//       financial_assessment?: string[];
//     };
//     /**
//      * Compliance requirements
//      */
//     compliance?: {
//       /**
//        * Compliance MT5 requirements
//        */
//       mt5?: string[];
//       /**
//        * Compliance tax information requirements
//        */
//       tax_information?: string[];
//     };
//     /**
//      * Sign up requirements
//      */
//     signup?: string[];
//     /**
//      * Withdrawal requirements
//      */
//     withdrawal?: string[];
//   };
//   /**
//    * Landing Company shortcode.
//    */
//   shortcode?: string;
//   /**
//    * Flag that indicates whether the landing company supports professional accounts or not
//    */
//   support_professional_client?: 0 | 1;
//   /**
//    * Flag that indicates whether tax identifier number is not mandatory for the current country and landing company.
//    */
//   tin_not_mandatory?: 0 | 1;
// }
/**
 * The configuration of each currency.
 */
export interface CurrencyConfigStructure {
  commodities?: Commodities;
  cryptocurrency?: Cryptocurrency;
  forex?: Forex;
  indices?: Indices;
  market?: Market;
  synthetic_index?: SyntheticIndex;
}
/**
 * Name of commodities.
 */
export interface Commodities {
  [k: string]: unknown;
}
/**
 * Name of cryptocurrency.
 */
export interface Cryptocurrency {
  [k: string]: unknown;
}
/**
 * Name of forex.
 */
export interface Forex {
  [k: string]: unknown;
}
/**
 * Name of indices.
 */
export interface Indices {
  [k: string]: unknown;
}
/**
 * Name of market.
 */
export interface Market {
  currency?: Currency;
}
/**
 * Currency Symbol.
 */
export interface Currency {
  /**
   * Maximum payout for this currency in this market.
   */
  max_payout?: number;
  /**
   * Minimum stake for this currency in this market.
   */
  min_stake?: number;
}
/**
 * Name of synthetic index.
 */
export interface SyntheticIndex {
  [k: string]: unknown;
}
/**
 * Client's 2-letter country code (obtained from `residence_list` call).
 */
// export type LandingCompany = string;

/**
 * The company has a number of licensed subsidiaries in various jurisdictions, which are called Landing Companies. This call will return the appropriate Landing Company for clients of a given country. The landing company may differ for derived contracts (Synthetic Indices) and Financial contracts (Forex, Stock Indices, Commodities).
 */
export interface LandingCompanyRequest {
  landing_company: LandingCompany;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Landing Company for MT5 combined all Synthetic and financial
 */
export type LandingCompanyDetails = {
  /**
   * Landing Company address
   */
  address?: string[] | null;
  /**
   * Special conditions for changing sensitive fields
   */
  changeable_fields?: {
    [k: string]: unknown;
  };
  client_kyc_status?: ClientKycStatusRequirements;
  /**
   * Landing Company country of incorporation
   */
  country?: string;
  currency_config?: CurrencyConfigStructure5;
  /**
   * Flag to indicate whether reality check is applicable for this Landing Company. `1`: applicable, `0`: not applicable. The Reality Check is a feature that gives a summary of the client's trades and account balances on a regular basis throughout his session, and is a regulatory requirement for certain Landing Companies.
   */
  has_reality_check?: 0 | 1;
  /**
   * Allowed contract types
   */
  legal_allowed_contract_categories?: string[];
  /**
   * Allowable currencies
   */
  legal_allowed_currencies?: string[];
  /**
   * Allowable markets
   */
  legal_allowed_markets?: string[];
  /**
   * Default account currency
   */
  legal_default_currency?: string;
  /**
   * Landing Company legal name
   */
  name?: string;
  requirements?: LegalRequirements;
  /**
   * Landing Company short code
   */
  shortcode?: string;
  /**
   * Flag that indicates whether the landing company supports professional accounts or not
   */
  support_professional_client?: 0 | 1;
  /**
   * Flag that indicates whether tax identifier number is not mandatory for the current country and landing company.
   */
  tin_not_mandatory?: 0 | 1;
} & (null | {
  /**
   * Landing Company address
   */
  address?: string[] | null;
  /**
   * Special conditions for changing sensitive fields
   */
  changeable_fields?: {
    [k: string]: unknown;
  };
  client_kyc_status?: ClientKycStatusRequirements;
  /**
   * Landing Company country of incorporation
   */
  country?: string;
  currency_config?: CurrencyConfigStructure5;
  /**
   * Flag to indicate whether reality check is applicable for this Landing Company. `1`: applicable, `0`: not applicable. The Reality Check is a feature that gives a summary of the client's trades and account balances on a regular basis throughout his session, and is a regulatory requirement for certain Landing Companies.
   */
  has_reality_check?: 0 | 1;
  /**
   * Allowed contract types
   */
  legal_allowed_contract_categories?: string[];
  /**
   * Allowable currencies
   */
  legal_allowed_currencies?: string[];
  /**
   * Allowable markets
   */
  legal_allowed_markets?: string[];
  /**
   * Default account currency
   */
  legal_default_currency?: string;
  /**
   * Landing Company legal name
   */
  name?: string;
  requirements?: LegalRequirements;
  /**
   * Landing Company short code
   */
  shortcode?: string;
  /**
   * Flag that indicates whether the landing company supports professional accounts or not
   */
  support_professional_client?: 0 | 1;
  /**
   * Flag that indicates whether tax identifier number is not mandatory for the current country and landing company.
   */
  tin_not_mandatory?: 0 | 1;
});
/**
 * Sign up requirements
 */
export type SignUpRequirements = string[];
/**
 * Withdrawal requirements
 */
export type WithdrawalRequirements = string[];
/**
 * Contain details for landing company for zero_spread sub account type.
 */
export type LandingCompanyDetails1 = {
  /**
   * Landing Company address
   */
  address?: string[] | null;
  /**
   * Special conditions for changing sensitive fields
   */
  changeable_fields?: {
    [k: string]: unknown;
  };
  client_kyc_status?: ClientKycStatusRequirements;
  /**
   * Landing Company country of incorporation
   */
  country?: string;
  currency_config?: CurrencyConfigStructure5;
  /**
   * Flag to indicate whether reality check is applicable for this Landing Company. `1`: applicable, `0`: not applicable. The Reality Check is a feature that gives a summary of the client's trades and account balances on a regular basis throughout his session, and is a regulatory requirement for certain Landing Companies.
   */
  has_reality_check?: 0 | 1;
  /**
   * Allowed contract types
   */
  legal_allowed_contract_categories?: string[];
  /**
   * Allowable currencies
   */
  legal_allowed_currencies?: string[];
  /**
   * Allowable markets
   */
  legal_allowed_markets?: string[];
  /**
   * Default account currency
   */
  legal_default_currency?: string;
  /**
   * Landing Company legal name
   */
  name?: string;
  requirements?: LegalRequirements;
  /**
   * Landing Company short code
   */
  shortcode?: string;
  /**
   * Flag that indicates whether the landing company supports professional accounts or not
   */
  support_professional_client?: 0 | 1;
  /**
   * Flag that indicates whether tax identifier number is not mandatory for the current country and landing company.
   */
  tin_not_mandatory?: 0 | 1;
} & (null | {
  /**
   * Landing Company address
   */
  address?: string[] | null;
  /**
   * Special conditions for changing sensitive fields
   */
  changeable_fields?: {
    [k: string]: unknown;
  };
  client_kyc_status?: ClientKycStatusRequirements;
  /**
   * Landing Company country of incorporation
   */
  country?: string;
  currency_config?: CurrencyConfigStructure5;
  /**
   * Flag to indicate whether reality check is applicable for this Landing Company. `1`: applicable, `0`: not applicable. The Reality Check is a feature that gives a summary of the client's trades and account balances on a regular basis throughout his session, and is a regulatory requirement for certain Landing Companies.
   */
  has_reality_check?: 0 | 1;
  /**
   * Allowed contract types
   */
  legal_allowed_contract_categories?: string[];
  /**
   * Allowable currencies
   */
  legal_allowed_currencies?: string[];
  /**
   * Allowable markets
   */
  legal_allowed_markets?: string[];
  /**
   * Default account currency
   */
  legal_default_currency?: string;
  /**
   * Landing Company legal name
   */
  name?: string;
  requirements?: LegalRequirements;
  /**
   * Landing Company short code
   */
  shortcode?: string;
  /**
   * Flag that indicates whether the landing company supports professional accounts or not
   */
  support_professional_client?: 0 | 1;
  /**
   * Flag that indicates whether tax identifier number is not mandatory for the current country and landing company.
   */
  tin_not_mandatory?: 0 | 1;
});
/**
 * Contain details for landing company for financial subtype. The Financial account is suitable for a wide range of traders, both new and experienced. It gives you mid-range leverage and variable spreads that give you a great deal of flexibility for whatever position you wish to take in the market.
 */
export type LandingCompanyDetails2 = {
  /**
   * Landing Company address
   */
  address?: string[] | null;
  /**
   * Special conditions for changing sensitive fields
   */
  changeable_fields?: {
    [k: string]: unknown;
  };
  client_kyc_status?: ClientKycStatusRequirements;
  /**
   * Landing Company country of incorporation
   */
  country?: string;
  currency_config?: CurrencyConfigStructure5;
  /**
   * Flag to indicate whether reality check is applicable for this Landing Company. `1`: applicable, `0`: not applicable. The Reality Check is a feature that gives a summary of the client's trades and account balances on a regular basis throughout his session, and is a regulatory requirement for certain Landing Companies.
   */
  has_reality_check?: 0 | 1;
  /**
   * Allowed contract types
   */
  legal_allowed_contract_categories?: string[];
  /**
   * Allowable currencies
   */
  legal_allowed_currencies?: string[];
  /**
   * Allowable markets
   */
  legal_allowed_markets?: string[];
  /**
   * Default account currency
   */
  legal_default_currency?: string;
  /**
   * Landing Company legal name
   */
  name?: string;
  requirements?: LegalRequirements;
  /**
   * Landing Company short code
   */
  shortcode?: string;
  /**
   * Flag that indicates whether the landing company supports professional accounts or not
   */
  support_professional_client?: 0 | 1;
  /**
   * Flag that indicates whether tax identifier number is not mandatory for the current country and landing company.
   */
  tin_not_mandatory?: 0 | 1;
} & (null | {
  /**
   * Landing Company address
   */
  address?: string[] | null;
  /**
   * Special conditions for changing sensitive fields
   */
  changeable_fields?: {
    [k: string]: unknown;
  };
  client_kyc_status?: ClientKycStatusRequirements;
  /**
   * Landing Company country of incorporation
   */
  country?: string;
  currency_config?: CurrencyConfigStructure5;
  /**
   * Flag to indicate whether reality check is applicable for this Landing Company. `1`: applicable, `0`: not applicable. The Reality Check is a feature that gives a summary of the client's trades and account balances on a regular basis throughout his session, and is a regulatory requirement for certain Landing Companies.
   */
  has_reality_check?: 0 | 1;
  /**
   * Allowed contract types
   */
  legal_allowed_contract_categories?: string[];
  /**
   * Allowable currencies
   */
  legal_allowed_currencies?: string[];
  /**
   * Allowable markets
   */
  legal_allowed_markets?: string[];
  /**
   * Default account currency
   */
  legal_default_currency?: string;
  /**
   * Landing Company legal name
   */
  name?: string;
  requirements?: LegalRequirements;
  /**
   * Landing Company short code
   */
  shortcode?: string;
  /**
   * Flag that indicates whether the landing company supports professional accounts or not
   */
  support_professional_client?: 0 | 1;
  /**
   * Flag that indicates whether tax identifier number is not mandatory for the current country and landing company.
   */
  tin_not_mandatory?: 0 | 1;
});
/**
 * Contain details for landing company for Financial STP subtype. The Financial STP account provides you with tight spreads, higher ticket size and offers a variety of FX pairs from majors to exotics. It is a straight through processing (STP) account with direct access to FX liquidity from various providers.
 */
export type LandingCompanyDetails3 = {
  /**
   * Landing Company address
   */
  address?: string[] | null;
  /**
   * Special conditions for changing sensitive fields
   */
  changeable_fields?: {
    [k: string]: unknown;
  };
  client_kyc_status?: ClientKycStatusRequirements;
  /**
   * Landing Company country of incorporation
   */
  country?: string;
  currency_config?: CurrencyConfigStructure5;
  /**
   * Flag to indicate whether reality check is applicable for this Landing Company. `1`: applicable, `0`: not applicable. The Reality Check is a feature that gives a summary of the client's trades and account balances on a regular basis throughout his session, and is a regulatory requirement for certain Landing Companies.
   */
  has_reality_check?: 0 | 1;
  /**
   * Allowed contract types
   */
  legal_allowed_contract_categories?: string[];
  /**
   * Allowable currencies
   */
  legal_allowed_currencies?: string[];
  /**
   * Allowable markets
   */
  legal_allowed_markets?: string[];
  /**
   * Default account currency
   */
  legal_default_currency?: string;
  /**
   * Landing Company legal name
   */
  name?: string;
  requirements?: LegalRequirements;
  /**
   * Landing Company short code
   */
  shortcode?: string;
  /**
   * Flag that indicates whether the landing company supports professional accounts or not
   */
  support_professional_client?: 0 | 1;
  /**
   * Flag that indicates whether tax identifier number is not mandatory for the current country and landing company.
   */
  tin_not_mandatory?: 0 | 1;
} & (null | {
  /**
   * Landing Company address
   */
  address?: string[] | null;
  /**
   * Special conditions for changing sensitive fields
   */
  changeable_fields?: {
    [k: string]: unknown;
  };
  client_kyc_status?: ClientKycStatusRequirements;
  /**
   * Landing Company country of incorporation
   */
  country?: string;
  currency_config?: CurrencyConfigStructure5;
  /**
   * Flag to indicate whether reality check is applicable for this Landing Company. `1`: applicable, `0`: not applicable. The Reality Check is a feature that gives a summary of the client's trades and account balances on a regular basis throughout his session, and is a regulatory requirement for certain Landing Companies.
   */
  has_reality_check?: 0 | 1;
  /**
   * Allowed contract types
   */
  legal_allowed_contract_categories?: string[];
  /**
   * Allowable currencies
   */
  legal_allowed_currencies?: string[];
  /**
   * Allowable markets
   */
  legal_allowed_markets?: string[];
  /**
   * Default account currency
   */
  legal_default_currency?: string;
  /**
   * Landing Company legal name
   */
  name?: string;
  requirements?: LegalRequirements;
  /**
   * Landing Company short code
   */
  shortcode?: string;
  /**
   * Flag that indicates whether the landing company supports professional accounts or not
   */
  support_professional_client?: 0 | 1;
  /**
   * Flag that indicates whether tax identifier number is not mandatory for the current country and landing company.
   */
  tin_not_mandatory?: 0 | 1;
});

/**
 * Returns the Landing Company for clients of a given country.
 */
export interface LandingCompanyResponse {
  landing_company?: LandingCompany;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "landing_company";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Landing Company
 */
export interface LandingCompany {
  /**
   * Flag to indicate if address parseable or not
   */
  address_parseable?: 1 | 0;
  /**
   * Config for all account types (Synthetic Indices and Financials).
   */
  all_company?: "svg" | "none";
  /**
   * Config structure with document types ,taxRequired ,tin format details.
   */
  config?: {
    [k: string]: unknown;
  };
  /**
   * Available CTrader accounts.
   */
  ctrader?: {
    /**
     * CTrader all account types (Synthetic Indices and Financials).
     */
    all?: {
      /**
       * For standard client
       */
      standard?: "svg" | "none";
    };
  };
  /**
   * Available Deriv X all account types (Synthetic Indices and Financials).
   */
  dxtrade_all_company?: {
    /**
     * Landing Company details.
     */
    standard?: {
      /**
       * Landing Company address
       */
      address?: string[] | null;
      /**
       * Special conditions for changing sensitive fields
       */
      changeable_fields?: {
        [k: string]: unknown;
      };
      /**
       * Landing Company country of incorporation
       */
      country?: string;
      currency_config?: CurrencyConfigStructure;
      /**
       * Flag to indicate whether reality check is applicable for this Landing Company. `1`: applicable, `0`: not applicable. The Reality Check is a feature that gives a summary of the client's trades and account balances on a regular basis throughout his session, and is a regulatory requirement for certain Landing Companies.
       */
      has_reality_check?: 0 | 1;
      /**
       * Allowed contract types
       */
      legal_allowed_contract_categories?: string[];
      /**
       * Allowable currencies
       */
      legal_allowed_currencies?: string[];
      /**
       * Allowable markets
       */
      legal_allowed_markets?: string[];
      /**
       * Default account currency
       */
      legal_default_currency?: string;
      /**
       * Landing Company legal name
       */
      name?: string;
      /**
       * Legal requirements for the Landing Company
       */
      requirements?: {
        /**
         * After first deposit requirements
         */
        after_first_deposit?: {
          /**
           * Financial assessment requirements
           */
          financial_assessment?: string[];
        };
        /**
         * Compliance requirements
         */
        compliance?: {
          /**
           * Compliance MT5 requirements
           */
          mt5?: string[];
          /**
           * Compliance tax information requirements
           */
          tax_information?: string[];
        };
        /**
         * Sign up requirements
         */
        signup?: string[];
        /**
         * Withdrawal requirements
         */
        withdrawal?: string[];
      };
      /**
       * Landing Company short code
       */
      shortcode?: string;
      /**
       * Flag that indicates whether the landing company supports professional accounts or not
       */
      support_professional_client?: 0 | 1;
      /**
       * Flag that indicates whether tax identifier number is not mandatory for the current country and landing company.
       */
      tin_not_mandatory?: 0 | 1;
    };
  };
  /**
   * Available Deriv X financial account types (all except Synthetic Indices).
   */
  dxtrade_financial_company?: {
    /**
     * Landing Company details.
     */
    standard?: {
      /**
       * Landing Company address
       */
      address?: string[] | null;
      /**
       * Special conditions for changing sensitive fields
       */
      changeable_fields?: {
        [k: string]: unknown;
      };
      /**
       * Landing Company country of incorporation
       */
      country?: string;
      currency_config?: CurrencyConfigStructure1;
      /**
       * Flag to indicate whether reality check is applicable for this Landing Company. `1`: applicable, `0`: not applicable. The Reality Check is a feature that gives a summary of the client's trades and account balances on a regular basis throughout his session, and is a regulatory requirement for certain Landing Companies.
       */
      has_reality_check?: 0 | 1;
      /**
       * Allowed contract types
       */
      legal_allowed_contract_categories?: string[];
      /**
       * Allowable currencies
       */
      legal_allowed_currencies?: string[];
      /**
       * Allowable markets
       */
      legal_allowed_markets?: string[];
      /**
       * Default account currency
       */
      legal_default_currency?: string;
      /**
       * Landing Company legal name
       */
      name?: string;
      /**
       * Legal requirements for the Landing Company
       */
      requirements?: {
        /**
         * After first deposit requirements
         */
        after_first_deposit?: {
          /**
           * Financial assessment requirements
           */
          financial_assessment?: string[];
        };
        /**
         * Compliance requirements
         */
        compliance?: {
          /**
           * Compliance MT5 requirements
           */
          mt5?: string[];
          /**
           * Compliance tax information requirements
           */
          tax_information?: string[];
        };
        /**
         * Sign up requirements
         */
        signup?: string[];
        /**
         * Withdrawal requirements
         */
        withdrawal?: string[];
      };
      /**
       * Landing Company short code
       */
      shortcode?: string;
      /**
       * Flag that indicates whether the landing company supports professional accounts or not
       */
      support_professional_client?: 0 | 1;
      /**
       * Flag that indicates whether tax identifier number is not mandatory for the current country and landing company.
       */
      tin_not_mandatory?: 0 | 1;
    };
  };
  /**
   * Available Deriv X derived account types (Synthetic Indices).
   */
  dxtrade_gaming_company?: {
    /**
     * Landing Company details.
     */
    standard?: {
      /**
       * Landing Company address
       */
      address?: string[] | null;
      /**
       * Special conditions for changing sensitive fields
       */
      changeable_fields?: {
        [k: string]: unknown;
      };
      /**
       * Landing Company country of incorporation
       */
      country?: string;
      currency_config?: CurrencyConfigStructure2;
      /**
       * Flag to indicate whether reality check is applicable for this Landing Company. `1`: applicable, `0`: not applicable. The Reality Check is a feature that gives a summary of the client's trades and account balances on a regular basis throughout his session, and is a regulatory requirement for certain Landing Companies.
       */
      has_reality_check?: 0 | 1;
      /**
       * Allowed contract types
       */
      legal_allowed_contract_categories?: string[];
      /**
       * Allowable currencies
       */
      legal_allowed_currencies?: string[];
      /**
       * Allowable markets
       */
      legal_allowed_markets?: string[];
      /**
       * Default account currency
       */
      legal_default_currency?: string;
      /**
       * Landing Company legal name
       */
      name?: string;
      /**
       * Legal requirements for the Landing Company
       */
      requirements?: {
        /**
         * After first deposit requirements
         */
        after_first_deposit?: {
          /**
           * Financial assessment requirements
           */
          financial_assessment?: string[];
        };
        /**
         * Compliance requirements
         */
        compliance?: {
          /**
           * Compliance MT5 requirements
           */
          mt5?: string[];
          /**
           * Compliance tax information requirements
           */
          tax_information?: string[];
        };
        /**
         * Sign up requirements
         */
        signup?: string[];
        /**
         * Withdrawal requirements
         */
        withdrawal?: string[];
      };
      /**
       * Landing Company short code
       */
      shortcode?: string;
      /**
       * Flag that indicates whether the landing company supports professional accounts or not
       */
      support_professional_client?: 0 | 1;
      /**
       * Flag that indicates whether tax identifier number is not mandatory for the current country and landing company.
       */
      tin_not_mandatory?: 0 | 1;
    };
  };
  /**
   * Landing Company for financial contracts (all except Synthetic Indices)
   */
  financial_company?: null | {
    /**
     * Landing Company address
     */
    address?: string[] | null;
    /**
     * Special conditions for changing sensitive fields
     */
    changeable_fields?: {
      [k: string]: unknown;
    };
    /**
     * Landing Company country of incorporation
     */
    country?: string;
    currency_config?: CurrencyConfigStructure3;
    /**
     * Flag to indicate whether reality check is applicable for this Landing Company. `1`: applicable, `0`: not applicable. The Reality Check is a feature that gives a summary of the client's trades and account balances on a regular basis throughout his session, and is a regulatory requirement for certain Landing Companies.
     */
    has_reality_check?: 1 | 0;
    /**
     * Allowed contract types for this Landing Company
     */
    legal_allowed_contract_categories?: string[];
    /**
     * Allowed account currencies for this Landing Company
     */
    legal_allowed_currencies?: string[];
    /**
     * Allowed markets for this Landing Company
     */
    legal_allowed_markets?: string[];
    /**
     * Default account currency
     */
    legal_default_currency?: string;
    /**
     * Landing Company legal name
     */
    name?: string;
    /**
     * Legal requirements for the Landing Company
     */
    requirements?: {
      /**
       * After first deposit requirements
       */
      after_first_deposit?: {
        /**
         * Financial assessment requirements
         */
        financial_assessment?: string[];
      };
      /**
       * Compliance requirements
       */
      compliance?: {
        /**
         * Compliance MT5 requirements
         */
        mt5?: string[];
        /**
         * Compliance tax information requirements
         */
        tax_information?: string[];
      };
      /**
       * Sign up requirements
       */
      signup?: string[];
      /**
       * Withdrawal requirements
       */
      withdrawal?: string[];
    };
    /**
     * Landing Company short code
     */
    shortcode?: string;
    /**
     * Flag that indicates whether the landing company supports professional accounts or not
     */
    support_professional_client?: 0 | 1;
    /**
     * Flag that indicates whether tax identifier number is not mandatory for the current country and landing company.
     */
    tin_not_mandatory?: 0 | 1;
  };
  /**
   * Forbidden postcode pattern
   */
  forbidden_postcode_pattern?: string;
  /**
   * Landing Company for derived contracts (Synthetic Indices)
   */
  gaming_company?: null | {
    /**
     * Landing Company address
     */
    address?: string[] | null;
    /**
     * Special conditions for changing sensitive fields
     */
    changeable_fields?: {
      [k: string]: unknown;
    };
    /**
     * Landing Company country of incorporation
     */
    country?: string;
    currency_config?: CurrencyConfigStructure4;
    /**
     * Flag to indicate whether reality check is applicable for this Landing Company. `1`: applicable, `0`: not applicable. The Reality Check is a feature that gives a summary of the client's trades and account balances on a regular basis throughout his session, and is a regulatory requirement for certain Landing Companies.
     */
    has_reality_check?: 0 | 1;
    /**
     * Allowed contract types
     */
    legal_allowed_contract_categories?: string[];
    /**
     * Allowable currencies
     */
    legal_allowed_currencies?: string[];
    /**
     * Allowable markets
     */
    legal_allowed_markets?: string[];
    /**
     * Default account currency
     */
    legal_default_currency?: string;
    /**
     * Landing Company legal name
     */
    name?: string;
    /**
     * Legal requirements for the Landing Company
     */
    requirements?: {
      /**
       * After first deposit requirements
       */
      after_first_deposit?: {
        /**
         * Financial assessment requirements
         */
        financial_assessment?: string[];
      };
      /**
       * Compliance requirements
       */
      compliance?: {
        /**
         * Compliance MT5 requirements
         */
        mt5?: string[];
        /**
         * Compliance tax information requirements
         */
        tax_information?: string[];
      };
      /**
       * Sign up requirements
       */
      signup?: string[];
      /**
       * Withdrawal requirements
       */
      withdrawal?: string[];
    };
    /**
     * Landing Company short code
     */
    shortcode?: string;
    /**
     * Flag that indicates whether the landing company supports professional accounts or not
     */
    support_professional_client?: 0 | 1;
    /**
     * Flag that indicates whether tax identifier number is not mandatory for the current country and landing company.
     */
    tin_not_mandatory?: 0 | 1;
  };
  /**
   * Country code
   */
  id?: string;
  /**
   * Flag to indicate if idv is supported or not
   */
  is_idv_supported?: 1 | 0;
  /**
   * Open mf account lc details.
   */
  lc_to_open_mf_account?: string;
  /**
   * Minimum age
   */
  minimum_age?: number;
  /**
   * Flag to indicate if mt5 age verification detail.
   */
  mt5_age_verification?: 1 | 0;
  /**
   * Landing Company for MT5 standard combined all Synthetic and financial, currently has Financial as subtype.
   */
  mt_all_company?: null | {
    swap_free?: LandingCompanyDetails;
    zero_spread?: LandingCompanyDetails1;
  };
  /**
   * Landing Company for MT5 financial contracts (all except Synthetic Indices), currently divided into Financial STP, Financial (standard) as subtypes.
   */
  mt_financial_company?: null | {
    financial?: LandingCompanyDetails2;
    financial_stp?: LandingCompanyDetails3;
  };
  /**
   * Landing Company for MT5 standard derived contracts (Synthetic Indices), currently has Financial as subtype.
   */
  mt_gaming_company?: null | {
    /**
     * Landing Company for MT5 derived contracts (Synthetic Indices)
     */
    financial?: null | {
      /**
       * Landing Company address
       */
      address?: string[] | null;
      /**
       * Special conditions for changing sensitive fields
       */
      changeable_fields?: {
        [k: string]: unknown;
      };
      /**
       * Landing Company country of incorporation
       */
      country?: string;
      currency_config?: CurrencyConfigStructure6;
      /**
       * Flag to indicate whether reality check is applicable for this Landing Company. `1`: applicable, `0`: not applicable. The Reality Check is a feature that gives a summary of the client's trades and account balances on a regular basis throughout his session, and is a regulatory requirement for certain Landing Companies.
       */
      has_reality_check?: 0 | 1;
      /**
       * Allowed contract types
       */
      legal_allowed_contract_categories?: string[];
      /**
       * Allowable currencies
       */
      legal_allowed_currencies?: string[];
      /**
       * Allowable markets
       */
      legal_allowed_markets?: string[];
      /**
       * Default account currency
       */
      legal_default_currency?: string;
      /**
       * Landing Company legal name
       */
      name?: string;
      /**
       * Legal requirements for the Landing Company
       */
      requirements?: {
        /**
         * After first deposit requirements
         */
        after_first_deposit?: {
          /**
           * Financial assessment requirements
           */
          financial_assessment?: string[];
        };
        /**
         * Compliance requirements
         */
        compliance?: {
          /**
           * Compliance MT5 requirements
           */
          mt5?: string[];
          /**
           * Compliance tax information requirements
           */
          tax_information?: string[];
        };
        /**
         * Sign up requirements
         */
        signup?: string[];
        /**
         * Withdrawal requirements
         */
        withdrawal?: string[];
      };
      /**
       * Landing Company short code
       */
      shortcode?: string;
      /**
       * Flag that indicates whether the landing company supports professional accounts or not
       */
      support_professional_client?: 0 | 1;
      /**
       * Flag that indicates whether tax identifier number is not mandatory for the current country and landing company.
       */
      tin_not_mandatory?: 0 | 1;
    };
  };
  /**
   * Country name
   */
  name?: string;
  /**
   * Flag to indicate whether max turnover limit settings.
   */
  need_set_max_turnover_limit?: 0 | 1;
  /**
   * Flag to indicate province settings.
   */
  no_province?: 0 | 1;
  /**
   * Flag to indicate whether address postcode is required or not.
   */
  require_address_postcode?: 0 | 1;
  /**
   * Flag to indicate whether age verification required ofr synthetic or not.
   */
  require_age_verified_for_synthetic?: 0 | 1;
  /**
   * Flag to indicate whether poi is required.
   */
  require_poi?: 0 | 1;
  /**
   * Flag to indicate whether verification required if age not verified.
   */
  require_verification_when_not_age_verified?: 0 | 1;
  /**
   * Flag to indicate whether to skip deposit verifcation or not.
   */
  skip_deposit_verification?: 0 | 1;
  /**
   * Virtual Company
   */
  virtual_company?: string;
}
/**
 * The configuration of each currency.
 */
export interface CurrencyConfigStructure {
  [k: string]: unknown;
}
/**
 * The configuration of each currency.
 */
export interface CurrencyConfigStructure1 {
  [k: string]: unknown;
}
/**
 * The configuration of each currency.
 */
export interface CurrencyConfigStructure2 {
  [k: string]: unknown;
}
/**
 * The configuration of each currency.
 */
export interface CurrencyConfigStructure3 {
  [k: string]: unknown;
}
/**
 * The configuration of each currency.
 */
export interface CurrencyConfigStructure4 {
  [k: string]: unknown;
}
/**
 * Client kyc statusequirements
 */
export interface ClientKycStatusRequirements {
  /**
   * Status of proof of address (POA).
   */
  poa_status: "none" | "pending" | "expired" | "verified" | "rejected";
  /**
   * Status of proof of identity (POI).
   */
  poi_status: "none" | "pending" | "verified" | "suspected" | "rejected" | "expired";
  /**
   * Indicates whether the tax identification number (TIN) is valid (1) or not (0).
   */
  valid_tin: 1 | 0;
}
/**
 * The configuration of each currency.
 */
export interface CurrencyConfigStructure5 {
  [k: string]: unknown;
}
/**
 * Legal requirements for the Landing Company
 */
export interface LegalRequirements {
  after_first_deposit?: AfterFirstDepositRequirements;
  compliance?: ComplianceRequirements;
  signup?: SignUpRequirements;
  withdrawal?: WithdrawalRequirements;
}
/**
 * After first deposit requirements
 */
export interface AfterFirstDepositRequirements {
  /**
   * Financial assessment requirements
   */
  financial_assessment?: string[];
}
/**
 * Compliance requirements
 */
export interface ComplianceRequirements {
  /**
   * Compliance MT5 requirements
   */
  mt5?: string[];
  /**
   * Compliance tax information requirements
   */
  tax_information?: string[];
}
/**
 * The configuration of each currency.
 */
export interface CurrencyConfigStructure6 {
  [k: string]: unknown;
}
/**
 * Get KYC Authentication Status
 */
export interface KYCAuthenticationStatusRequest {
  /**
   * Must be `1`
   */
  kyc_auth_status: 1;
  /**
   * The country for which service availability is being verified, 2-letter country code
   */
  country?: string;
  /**
   * Indicates which landing companies to get the KYC authentication status for.
   */
  landing_companies?: (
    | "iom"
    | "malta"
    | "maltainvest"
    | "svg"
    | "virtual"
    | "vanuatu"
    | "labuan"
    | "samoa"
    | "samoa-virtual"
    | "bvi"
    | "dsl"
  )[];
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Proof of Identity (POI) and Proof of Address (POA) authentication status details.
 */
export type KycAuthStatus =
  | {
      /**
       * POA authentication status details.
       */
      address: {
        /**
         * Current POA status.
         */
        status?: "none" | "pending" | "rejected" | "verified" | "expired";
        /**
         * Supported documents per document_type.
         */
        supported_documents?: string[];
      };
      /**
       * POI authentication status details.
       */
      identity: {
        /**
         * Available services for the next POI attempt.
         */
        available_services?: string[];
        /**
         * Details on the rejected POI attempt.
         */
        last_rejected?: {
          /**
           * Document type of the rejected POI attempt (IDV only).
           */
          document_type?: null | string;
          /**
           * Reason(s) for the rejected POI attempt.
           */
          rejected_reasons?: string[];
          /**
           * Indicate if the verification report was returned by the provider (IDV only).
           */
          report_available?: 0 | 1;
        };
        /**
         * Service used for the current POI status.
         */
        service?: "none" | "idv" | "onfido" | "manual";
        /**
         * Current POI status.
         */
        status?: "none" | "pending" | "rejected" | "verified" | "expired" | "suspected";
        /**
         * Supported documents per service.
         */
        supported_documents?: {
          idv?: {
            [k: string]: {
              additional?: {
                display_name?: string;
                format?: string;
                [k: string]: unknown;
              };
              display_name?: string;
              format?: string;
              [k: string]: unknown;
            };
          };
          manual?: {
            [k: string]: {
              display_name?: string;
              [k: string]: unknown;
            };
          };
          onfido?: {
            [k: string]: {
              display_name?: string;
              [k: string]: unknown;
            };
          };
          [k: string]: unknown;
        };
        /**
         * Supported documents override per service.
         */
        supported_documents_override?: {
          manual?: {
            [k: string]: {
              display_name?: string;
              [k: string]: unknown;
            };
          };
          [k: string]: unknown;
        };
      };
    }
  | {
      [k: string]: {
        /**
         * POA authentication status details.
         */
        address: {
          /**
           * Current POA status.
           */
          status?: "none" | "pending" | "rejected" | "verified" | "expired";
          /**
           * Supported documents per document_type.
           */
          supported_documents?: string[];
        };
        /**
         * POI authentication status details.
         */
        identity: {
          /**
           * Available services for the next POI attempt.
           */
          available_services?: string[];
          /**
           * Details on the rejected POI attempt.
           */
          last_rejected?: {
            /**
             * Document type of the rejected POI attempt (IDV only).
             */
            document_type?: null | string;
            /**
             * Reason(s) for the rejected POI attempt.
             */
            rejected_reasons?: string[];
            /**
             * Indicate if the verification report was returned by the provider (IDV only).
             */
            report_available?: 0 | 1;
          };
          /**
           * Service used for the current POI status.
           */
          service?: "none" | "idv" | "onfido" | "manual";
          /**
           * Current POI status.
           */
          status?: "none" | "pending" | "rejected" | "verified" | "expired" | "suspected";
          /**
           * Supported documents per service.
           */
          supported_documents?: {
            idv?: {
              [k: string]: {
                additional?: {
                  display_name?: string;
                  format?: string;
                  [k: string]: unknown;
                };
                display_name?: string;
                format?: string;
                [k: string]: unknown;
              };
            };
            manual?: {
              [k: string]: {
                display_name?: string;
                [k: string]: unknown;
              };
            };
            onfido?: {
              [k: string]: {
                display_name?: string;
                [k: string]: unknown;
              };
            };
            [k: string]: unknown;
          };
          /**
           * Supported documents override per service.
           */
          supported_documents_override?: {
            manual?: {
              [k: string]: {
                display_name?: string;
                [k: string]: unknown;
              };
            };
            [k: string]: unknown;
          };
        };
      };
    };

/**
 * A message with KYC Authentication Status.
 */
export interface KYCAuthenticationStatusResponse {
  kyc_auth_status?: KycAuthStatus;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "kyc_auth_status";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Adds document information such as issuing country, id and type for identity verification processes.
 */
export interface IdentityVerificationAddDocumentRequest {
  /**
   * Must be `1`
   */
  identity_verification_document_add: 1;
  /**
   * [Optional] Additional info required by some document types.
   */
  document_additional?: string;
  /**
   * The identification number of the document.
   */
  document_number: string;
  /**
   * The type of the document based on provided `issuing_country` (can obtained from `residence_list` call).
   */
  document_type: string;
  /**
   * 2-letter country code (can obtained from `residence_list` call).
   */
  issuing_country: string;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * 1 on success
 */
export type IdentityVerificationDocumentAdd = 1;

/**
 * Adds document information such as issuing country, id and type for identity verification processes.
 */
export interface IdentityVerificationAddDocumentResponse {
  identity_verification_document_add?: IdentityVerificationDocumentAdd;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "identity_verification_document_add";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Get User Settings (email, date of birth, address etc)
 */
export interface GetAccountSettingsRequest {
  /**
   * Must be `1`
   */
  get_settings: 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * A message with User Settings
 */
export interface GetAccountSettingsResponse {
  get_settings?: GetSettings;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "get_settings";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * User information and settings.
 */
export interface GetSettings {
  /**
   * Purpose and reason for requesting the account opening. Only applicable for real money account.
   */
  account_opening_reason?: null | string;
  /**
   * City (note: Only available for users who have at least one real account)
   */
  address_city?: string;
  /**
   * Address line 1 (note: Only available for users who have at least one real account)
   */
  address_line_1?: string;
  /**
   * Address line 2 (note: Only available for users who have at least one real account)
   */
  address_line_2?: string;
  /**
   * Post Code (note: Only available for users who have at least one real account)
   */
  address_postcode?: string;
  /**
   * State (note: Only available for users who have at least one real account)
   */
  address_state?: string;
  /**
   * Boolean value 1 or 0, indicating permission to allow others to follow your trades. Note: not applicable for Virtual account. Only allow for real money account.
   */
  allow_copiers?: 0 | 1;
  /**
   * Country of legal citizenship, 2-letter country code.
   */
  citizen?: string;
  /**
   * Latest terms and conditions version accepted by client
   */
  client_tnc_status?: null | string;
  /**
   * Cooldown expiration epoch date when a client fails appropriateness tests
   */
  cooling_off_expiration_date?: number | null;
  /**
   * User Country (same as residence field) - deprecated
   */
  country?: null | string;
  /**
   * 2-letter country code ISO standard
   */
  country_code?: null | string;
  /**
   * Epoch of user's birthday (note: Only available for users who have at least one real account)
   */
  date_of_birth?: number | null;
  /**
   * Boolean value 1 or 0, indicating if user email belong to dxtrade exception list.
   */
  dxtrade_user_exception?: 0 | 1;
  /**
   * User Email
   */
  email?: string;
  /**
   * Boolean value 1 or 0, indicating permission to use email address for any contact which may include marketing
   */
  email_consent?: 0 | 1;
  /**
   * Employment Status.
   */
  employment_status?: "Employed" | "Pensioner" | "Self-Employed" | "Student" | "Unemployed";
  /**
   * Indicates client's self-declaration for FATCA.
   */
  fatca_declaration?: number | null;
  /**
   * Contains features that are enabled or disabled for this user
   */
  feature_flag?: {
    /**
     * Boolean value 1 or 0 indicating whether his feature this enabled or not
     */
    wallet?: 0 | 1;
  };
  /**
   * First name (note: Only available for users who have at least one real account)
   */
  first_name?: string;
  /**
   * Returns 1 if the client has a secret answer, 0 otherwise.
   */
  has_secret_answer?: 0 | 1;
  /**
   * A list of profile fields which are immutable (read-only unless they are not set yet) due to landing company regulations and the current status of the account.
   */
  immutable_fields?: string[];
  /**
   * Boolean value 1 or 0, indicating whether is payment agent (note: not applicable for virtual money accounts)
   */
  is_authenticated_payment_agent?: 0 | 1;
  /**
   * Last name (note: Only available for users who have at least one real account)
   */
  last_name?: string;
  /**
   * Indicates client's self-declaration of not being a PEP/RCA (Politically Exposed Person/Relatives and Close Associates). Note: returned for real accounts only.
   */
  non_pep_declaration?: 0 | 1;
  /**
   * Telephone (note: Only available for users who have at least one real account)
   */
  phone?: null | string;
  /**
   * The status of the Phone Number Verification.
   */
  phone_number_verification?: {
    /**
     * Indicates the attempts remaining for /phone_number_challenge
     */
    challenge_attempts_remaining?: number;
    /**
     * (Optional) Indicates the timestamp for the next verification attempt
     */
    next_attempt?: number;
    /**
     * (Optional) Indicates the timestamp for the next email verification attempt
     */
    next_email_attempt?: number;
    /**
     * (Optional) Indicates the timestamp for the next verify attempt
     */
    next_verify_attempt?: number;
    /**
     * (Optional) Indicates the timestamp for the current's session email code expiry
     */
    session_timestamp?: number;
    /**
     * Indicates the verification status of the client's phone number.
     */
    verified: 0 | 1;
    /**
     * Indicates the attempts remaining for /phone_number_verification
     */
    verify_attempts_remaining?: number;
  };
  /**
   * Place of birth, 2-letter country code.
   */
  place_of_birth?: null | string;
  /**
   * User's preferred language, ISO standard code of language
   */
  preferred_language?: null | string;
  /**
   * Boolean value 1 or 0, indicating if client has requested professional status.
   */
  request_professional_status?: 0 | 1;
  /**
   * User Country
   */
  residence?: null | string;
  /**
   * Salutation (note: Only available for users who have at least one real account)
   */
  salutation?: string;
  /**
   * Tax identification number. Only applicable for real money account.
   */
  tax_identification_number?: null | string;
  /**
   * Residence for tax purpose. Comma separated iso country code if multiple jurisdictions. Only applicable for real money account.
   */
  tax_residence?: null | string;
  /**
   * [Optional] Whether the client has skipped the TIN form. Only applicable for real money account.
   */
  tin_skipped?: 0 | 1;
  /**
   * Terms and condition status tells us whether all the accounts of this user has accepted the latest T&C version.
   */
  tnc_status?: {
    [k: string]: unknown;
  };
  /**
   * Boolean value 1 or 0, indicating if client has enabled the Trading Hub dashboard
   */
  trading_hub?: number;
  /**
   * Hash generated using user details to verify whether the user is legitimate for our customer support system.
   */
  user_hash?: null | string;
}
/**
 * Allows users to exclude themselves from the website for certain periods of time, or to set limits on their trading activities. This facility is a regulatory requirement for certain Landing Companies.
 */
export interface GetSelfExclusionRequest {
  /**
   * Must be `1`
   */
  get_self_exclusion: 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * A message with User Self-Exclusion
 */
export interface GetSelfExclusionResponse {
  get_self_exclusion?: GetSelfExclusion;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "get_self_exclusion";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * List of values set for self exclusion.
 */
export interface GetSelfExclusion {
  /**
   * Exclude me from the website (for a minimum of 6 months, up to a maximum of 5 years). Note: uplifting this self-exclusion may require contacting the company.
   */
  exclude_until?: string;
  /**
   * 30-day limit on deposits
   */
  max_30day_deposit?: number;
  /**
   * 30-day limit on losses
   */
  max_30day_losses?: number;
  /**
   * 30-day turnover limit
   */
  max_30day_turnover?: number;
  /**
   * 7-day limit on deposits
   */
  max_7day_deposit?: number;
  /**
   * 7-day limit on losses
   */
  max_7day_losses?: number;
  /**
   * 7-day turnover limit
   */
  max_7day_turnover?: number;
  /**
   * Maximum account cash balance
   */
  max_balance?: number;
  /**
   * Daily limit on deposits
   */
  max_deposit?: number;
  /**
   * Daily limit on losses
   */
  max_losses?: number;
  /**
   * Maximum number of open positions
   */
  max_open_bets?: number;
  /**
   * Daily turnover limit
   */
  max_turnover?: number;
  /**
   * Session duration limit, in minutes
   */
  session_duration_limit?: number;
  /**
   * Exclude me from the website (for up to 6 weeks). The time is in epoch format. Note: unlike `exclude_until`, this self-exclusion will be lifted automatically at the expiry of the timeout period.
   */
  timeout_until?: number;
}
/**
 * Trading and Withdrawal Limits for a given user
 */
export interface AccountLimitsRequest {
  /**
   * Must be `1`
   */
  get_limits: 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Trading and Withdrawal Limits
 */
export interface AccountLimitsResponse {
  get_limits?: GetLimits;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "get_limits";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Trading limits of real account user
 */
export interface GetLimits {
  /**
   * Maximum account cash balance
   */
  account_balance?: null | number;
  /**
   * Cumulative daily transfer limits
   */
  daily_cumulative_amount_transfers?: {
    [k: string]: unknown;
  };
  /**
   * Daily transfers
   */
  daily_transfers?: {
    [k: string]: unknown;
  };
  /**
   * Maximum daily turnover
   */
  daily_turnover?: number;
  /**
   * Lifetime withdrawal limit
   */
  lifetime_limit?: number;
  /**
   * Lifetime transfer limits. Only present when applicable to the current accout.
   */
  lifetime_transfers?: {
    /**
     * Lifetime transfer limit for crypto to crypto currencies.
     */
    crypto_to_crypto?: {
      /**
       * Total limit in client's currency.
       */
      allowed?: number;
      /**
       * Remaining limit in client's currency.
       */
      available?: number;
    };
    /**
     * Lifetime transfer limit for crypto to fiat currencies.
     */
    crypto_to_fiat?: {
      /**
       * Total limit in client's currency.
       */
      allowed?: number;
      /**
       * Remaining limit in client's currency.
       */
      available?: number;
    };
    /**
     * Lifetime transfer limit for fiat to crypto currencies.
     */
    fiat_to_crypto?: {
      /**
       * Total limit in client's currency.
       */
      allowed?: number;
      /**
       * Remaining limit in client's currency.
       */
      available?: number;
    };
  };
  /**
   * Contains limitation information for each market.
   */
  market_specific?: {
    /**
     * List of limitation profiles for each market
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^(commodities|forex|indices|synthetic_index)$".
     */
    [k: string]: {
      /**
       * The group the profile belong to.
       */
      level?: string;
      /**
       * The market or submarket display name.
       */
      name?: string;
      /**
       * The limit of payout for the submarket
       */
      payout_limit?: number;
      /**
       * The limitation profile name.
       */
      profile_name?: string;
      /**
       * The limit of turnover for the submarket
       */
      turnover_limit?: number;
    }[];
  };
  /**
   * Number of days for num_of_days_limit withdrawal limit
   */
  num_of_days?: number;
  /**
   * Withdrawal limit for num_of_days days
   */
  num_of_days_limit?: number;
  /**
   * Maximum number of open positions
   */
  open_positions?: number;
  /**
   * Maximum aggregate payouts on open positions
   */
  payout?: number;
  /**
   * Maximum payout for each symbol based on different barrier types.
   */
  payout_per_symbol?: null | {
    /**
     * Maximum aggregate payouts on open positions per symbol for contracts where barrier is same as entry spot.
     */
    atm?: null | number;
    /**
     * Maximum aggregate payouts on open positions per symbol for contract where barrier is different from entry spot.
     */
    non_atm?: {
      /**
       * Maximum aggregate payouts on open positions per symbol for contract where barrier is different from entry spot and duration is less than and equal to seven days
       */
      less_than_seven_days?: number;
      /**
       * Maximum aggregate payouts on open positions per symbol for contract where barrier is different from entry spot and duration is more to seven days
       */
      more_than_seven_days?: number;
    };
  };
  /**
   * Maximum aggregate payouts on open positions per symbol and contract type. This limit can be exceeded up to the overall payout limit if there is no prior open position.
   */
  payout_per_symbol_and_contract_type?: number;
  /**
   * Amount left to reach withdrawal limit
   */
  remainder?: number;
  /**
   * Total withdrawal for num_of_days days
   */
  withdrawal_for_x_days_monetary?: number;
  /**
   * Total withdrawal since inception
   */
  withdrawal_since_inception_monetary?: number;
}
/**
 * This call gets the financial assessment details. The 'financial assessment' is a questionnaire that clients of certain Landing Companies need to complete, due to regulatory and KYC (know your client) requirements.
 */
export interface GetFinancialAssessmentRequest {
  /**
   * Must be `1`
   */
  get_financial_assessment: 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * This call gets the financial assessment details of client's account.
 */
export interface GetFinancialAssessmentResponse {
  get_financial_assessment?: GetFinancialAssessment;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "get_financial_assessment";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Client's financial assessment details
 */
export interface GetFinancialAssessment {
  /**
   * The anticipated account turnover
   */
  account_turnover?: string;
  /**
   * Binary options trading experience
   */
  binary_options_trading_experience?: string;
  /**
   * Binary options trading frequency
   */
  binary_options_trading_frequency?: string;
  /**
   * How much experience do you have in CFD trading?
   */
  cfd_experience?: string;
  /**
   * How many CFD trades have you placed in the past 12 months?
   */
  cfd_frequency?: string;
  /**
   * CFD Score
   */
  cfd_score?: number;
  /**
   * In your understanding, CFD trading allows you to:
   */
  cfd_trading_definition?: string;
  /**
   * CFDs trading experience
   */
  cfd_trading_experience?: string;
  /**
   * CFDs trading frequency
   */
  cfd_trading_frequency?: string;
  /**
   * Commodities trading experience
   */
  commodities_trading_experience?: string;
  /**
   * Commodities trading frequency
   */
  commodities_trading_frequency?: string;
  /**
   * Level of Education
   */
  education_level?: string;
  /**
   * Industry of Employment
   */
  employment_industry?: string;
  /**
   * Employment Status
   */
  employment_status?: string;
  /**
   * Estimated Net Worth
   */
  estimated_worth?: string;
  /**
   * Financial Information Score
   */
  financial_information_score?: number;
  /**
   * Forex trading experience
   */
  forex_trading_experience?: string;
  /**
   * Forex trading frequency
   */
  forex_trading_frequency?: string;
  /**
   * Income Source
   */
  income_source?: string;
  /**
   * Indices trading experience
   */
  indices_trading_experience?: string;
  /**
   * Indices trading frequency
   */
  indices_trading_frequency?: string;
  /**
   * How does leverage affect CFD trading?
   */
  leverage_impact_trading?: string;
  /**
   * Leverage trading is high-risk, so it's a good idea to use risk management features such as stop loss. Stop loss allows you to
   */
  leverage_trading_high_risk_stop_loss?: string;
  /**
   * Net Annual Income
   */
  net_income?: string;
  /**
   * Occupation
   */
  occupation?: string;
  /**
   * Trading experience in other financial derivatives
   */
  other_derivatives_trading_experience?: string;
  /**
   * Trading frequency in other financial derivatives
   */
  other_derivatives_trading_frequency?: string;
  /**
   * Trading experience in other financial instruments
   */
  other_instruments_trading_experience?: string;
  /**
   * Trading frequency in other financial instruments
   */
  other_instruments_trading_frequency?: string;
  /**
   * When would you be required to pay an initial margin?
   */
  required_initial_margin?: string;
  /**
   * Do you understand that you could potentially lose 100% of the money you use to trade?
   */
  risk_tolerance?: string;
  /**
   * How much knowledge and experience do you have in relation to online trading?
   */
  source_of_experience?: string;
  /**
   * Source of wealth
   */
  source_of_wealth?: string;
  /**
   * Stocks trading experience
   */
  stocks_trading_experience?: string;
  /**
   * Stocks trading frequency
   */
  stocks_trading_frequency?: string;
  /**
   * Total Score
   */
  total_score?: number;
  /**
   * How much experience do you have with other financial instruments?
   */
  trading_experience_financial_instruments?: string;
  /**
   * How many trades have you placed with other financial instruments in the past 12 months?
   */
  trading_frequency_financial_instruments?: string;
  /**
   * Trading Experience Score
   */
  trading_score?: number;
}
/**
 * Get Account Status
 */
export interface AccountStatusRequest {
  /**
   * Must be `1`
   */
  get_account_status: 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * A message with Account Status
 */
export interface AccountStatusResponse {
  get_account_status?: GetAccountStatus;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "get_account_status";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Account status details
 */
export interface GetAccountStatus {
  /**
   * This represents the authentication status of the user and it includes what authentication is needed.
   */
  authentication?: {
    /**
     * POI attempts made by the client
     */
    attempts?: {
      /**
       * A number of POI attempts made by the client
       */
      count?: number;
      /**
       * A list of POI attempts made by the client in chronological descending order
       */
      history?: {
        /**
         * 2-letter country code used to request the attempt.
         */
        country_code?: string;
        /**
         * The document type of the attempt.
         */
        document_type?: string;
        /**
         * The id of the attempt.
         */
        id?: string;
        /**
         * The service used to make the verification.
         */
        service?: string;
        /**
         * Status of the attempt.
         */
        status?: "verified" | "rejected" | "pending" | "expired" | "none";
        /**
         * The epoch of the attempt.
         */
        timestamp?: number;
      }[];
      /**
       * The latest POI attempt made by the client
       */
      latest?: null | {
        [k: string]: unknown;
      };
    };
    /**
     * The authentication status for document.
     */
    document?: {
      /**
       * This is the epoch of the document expiry date.
       */
      expiry_date?: number;
      /**
       * This represents the current status of the proof of address document submitted for authentication.
       */
      status?: "none" | "pending" | "rejected" | "verified" | "expired" | "suspected";
      /**
       * This represents the current status of authentication for each mt5 jurisdiction.
       */
      verified_jurisdiction?: {
        /**
         * This represents whether the client is allowed or not to create an account under this jurisdiction
         */
        bvi?: 0 | 1;
        /**
         * This represents whether the client is allowed or not to create an account under this jurisdiction
         */
        dml?: 0 | 1;
        /**
         * This represents whether the client is allowed or not to create an account under this jurisdiction
         */
        dsl?: 0 | 1;
        /**
         * This represents whether the client is allowed or not to create an account under this jurisdiction
         */
        iom?: 0 | 1;
        /**
         * This represents whether the client is allowed or not to create an account under this jurisdiction
         */
        labuan?: 0 | 1;
        /**
         * This represents whether the client is allowed or not to create an account under this jurisdiction
         */
        malta?: 0 | 1;
        /**
         * This represents whether the client is allowed or not to create an account under this jurisdiction
         */
        maltainvest?: 0 | 1;
        /**
         * This represents whether the client is allowed or not to create an account under this jurisdiction
         */
        samoa?: 0 | 1;
        /**
         * This represents whether the client is allowed or not to create an account under this jurisdiction
         */
        "samoa-virtual"?: 0 | 1;
        /**
         * This represents whether the client is allowed or not to create an account under this jurisdiction
         */
        svg?: 0 | 1;
        /**
         * This represents whether the client is allowed or not to create an account under this jurisdiction
         */
        vanuatu?: 0 | 1;
        /**
         * This represents whether the client is allowed or not to create an account under this jurisdiction
         */
        virtual?: 0 | 1;
      };
    };
    /**
     * The authentication status for identity.
     */
    identity?: {
      /**
       * This is the epoch of the document expiry date.
       */
      expiry_date?: number;
      /**
       * This shows the information about the authentication services implemented
       */
      services?: {
        /**
         * This shows the information related to IDV supported services
         */
        idv?: {
          /**
           * This is the epoch of the document expiry date.
           */
          expiry_date?: number;
          /**
           * Show the last IDV reported reasons for the rejected cases
           */
          last_rejected?: string[];
          /**
           * Indicate if the verification report was returned by the provider
           */
          report_available?: 0 | 1;
          /**
           * Shows the latest document properties detected and reported by IDVS
           */
          reported_properties?: {
            [k: string]: unknown;
          };
          /**
           * This represents the status of the latest IDV check.
           */
          status?: "none" | "pending" | "rejected" | "verified" | "expired";
          /**
           * This shows the number of IDV submissions left for the client
           */
          submissions_left?: number;
        };
        /**
         * This shows the information related to the manual POI checks
         */
        manual?: {
          /**
           * This represents the status of the current manual POI check.
           */
          status?: "none" | "pending" | "rejected" | "verified" | "expired" | "suspected";
        };
        /**
         * This shows the information related to Onfido supported services
         */
        onfido?: {
          /**
           * 3 letter country code for Onfide SDK
           */
          country_code?: string;
          /**
           * This shows the list of documents types supported by Onfido
           */
          documents?: string[];
          /**
           * This shows the list of documents types supported.
           */
          documents_supported?: string[];
          /**
           * This shows the information if the country is supported by Onfido
           */
          is_country_supported?: 1 | 0;
          /**
           * Show the last Onfido reported reasons for the rejected cases
           */
          last_rejected?: string[];
          /**
           * Shows the latest document properties detected and reported by Onfido
           */
          reported_properties?: {
            [k: string]: unknown;
          };
          /**
           * This represents the status of the latest Onfido check.
           */
          status?: "none" | "pending" | "rejected" | "verified" | "expired" | "suspected";
          /**
           * This shows the number of Onfido submissions left for the client
           */
          submissions_left?: number;
        };
      };
      /**
       * This represent the current status for proof of identity document submitted for authentication.
       */
      status?: "none" | "pending" | "rejected" | "verified" | "expired" | "suspected";
    };
    /**
     * The authentication status for source of income document.
     */
    income?: {
      /**
       * Epoch of the source of income document expiry date.
       */
      expiry_date?: number;
      /**
       * Current status of the proof of income document submitted for authentication.
       */
      status?: "none" | "pending" | "rejected" | "verified" | "locked";
    };
    /**
     * An array containing the list of required authentication.
     */
    needs_verification: string[];
    /**
     * The current state of the proof of ownership.
     */
    ownership?: {
      /**
       * The list of proof of ownership requests to fullfil
       */
      requests?: {
        /**
         * The request timestamp of creation
         */
        creation_time?: string;
        /**
         * Number of documents required to be uploaded for proof of ownership
         */
        documents_required?: number;
        /**
         * The identifier of the proof of ownership request
         */
        id?: number;
        /**
         * The display name of the payment method being requested
         */
        payment_method?: string;
      }[];
      /**
       * This represents the current status of the proof of ownership
       */
      status?: "none" | "pending" | "rejected" | "verified";
    };
  };
  /**
   * Contains missing profile fields required for cashier access.
   */
  cashier_missing_fields?: string[];
  /**
   * If the cashier is unavailble, this array contains one or more error codes for each reason.
   */
  cashier_validation?: string[];
  /**
   * Provides cashier details for client currency.
   */
  currency_config: {
    /**
     * Client currency
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[a-zA-Z0-9]{2,20}$".
     */
    [k: string]: {
      /**
       * Deposit is allowed for currency or not
       */
      is_deposit_suspended?: 0 | 1;
      /**
       * Withdrawal is allowed for currency or not
       */
      is_withdrawal_suspended?: 0 | 1;
    };
  };
  /**
   * P2P requires proof of address.
   */
  p2p_poa_required: 0 | 1;
  /**
   * Current P2P status of client.
   */
  p2p_status: "none" | "active" | "temp_ban" | "perm_ban";
  /**
   * Indicates whether the client should be prompted to authenticate their account.
   */
  prompt_client_to_authenticate: 1 | 0;
  /**
   * Client risk classification: `low`, `standard`, `high`.
   */
  risk_classification: string;
  /**
   * Social identity provider a user signed up with.
   */
  social_identity_provider?: "google" | "facebook" | "apple";
  /**
   * Account status. Possible status:
   * - `address_verified`: client's address is verified by third party services.
   * - `allow_document_upload`: client is allowed to upload documents.
   * - `age_verification`: client is age-verified.
   * - `authenticated`: client is fully authenticated.
   * - `cashier_locked`: cashier is locked.
   * - `crs_tin_information`: client has updated tax related information.
   * - `deposit_locked`: deposit is not allowed.
   * - `disabled`: account is disabled.
   * - `document_expired`: client's submitted proof-of-identity documents have expired.
   * - `document_expiring_soon`: client's submitted proof-of-identity documents are expiring within a month.
   * - `dxtrade_password_not_set`: Deriv X password is not set.
   * - `financial_assessment_not_complete`: client should complete their financial assessment.
   * - `financial_information_not_complete`: client has not completed financial assessment.
   * - `financial_risk_approval`: client has accepted financial risk disclosure.
   * - `max_turnover_limit_not_set`: client has not set financial limits on their account. Applies to UK and Malta clients.
   * - `mt5_password_not_set`: MT5 password is not set.
   * - `mt5_withdrawal_locked`: MT5 deposits allowed, but withdrawal is not allowed.
   * - `needs_affiliate_coc_approval`: user must approve the Affiliate's Code of Conduct Agreement.
   * - `no_trading`: trading is disabled.
   * - `no_withdrawal_or_trading`: client cannot trade or withdraw but can deposit.
   * - `p2p_blocked_for_pa`: p2p is blocked for the current payment agent client.
   * - `pa_withdrawal_explicitly_allowed`: withdrawal through payment agent is allowed.
   * - `password_reset_required`: this client must reset their password.
   * - `professional`: this client has opted for a professional account.
   * - `professional_requested`: this client has requested for a professional account.
   * - `professional_rejected`: this client's request for a professional account has been rejected.
   * - `social_signup`: this client is using social signup.
   * - `trading_experience_not_complete`: client has not completed the trading experience questionnaire.
   * - `ukgc_funds_protection`: client has acknowledged UKGC funds protection notice.
   * - `unwelcome`: client cannot deposit or buy contracts, but can withdraw or sell contracts.
   * - `withdrawal_locked`: deposits allowed but withdrawals are not allowed.
   * - `deposit_attempt`: this prevent a client from changing the account currency after deposit attempt.
   * - `poi_name_mismatch`: client POI documents name mismatch.
   * - `allow_poa_resubmission`: the client can resubmit POA documents.
   * - `allow_poi_resubmission`: the client can resubmit POI documents.
   * - `shared_payment_method`: the client has been sharing payment methods.
   * - `personal_details_locked`: client is not allowed to edit personal profile details.
   * - `transfers_blocked`: it block any transfer between two accounts.
   * - `df_deposit_requires_poi`: the DF deposit will be blocked until the client gets age verified.
   * - `authenticated_with_idv_photoid`: the client has been fully authenticated by IDV.
   * - `idv_revoked`: the client used to be fully authenticated by IDV but it was taken away due to compliance criteria.
   * - `mt5_additional_kyc_required`: client tax information, place of birth and account opening reason is missing.
   * - `poi_expiring_soon`: the POI documents of the client will get expired soon, allow them to reupload POI documents.
   * - `poa_authenticated_with_idv`: the POA is authenticated via IDV.
   * - `poa_expiring_soon`: the POA documents of the client will get outdated soon, allow them to reupload POA documents.
   * - `tin_manually_approved`: the client's tax_identification_number has been manually approved as client is not applicable for tax_identification_number
   */
  status: string[];
}
/**
 * Valid stream types that can be used to unsubscribe from.
 */
export type StreamTypes =
  | "balance"
  | "candles"
  | "cashier_payments"
  | "p2p_advert"
  | "p2p_advertiser"
  | "p2p_order"
  | "proposal"
  | "proposal_open_contract"
  | "ticks"
  | "transaction"
  | "trading_platform_asset_listing"
  | "website_status"
  | "p2p_settings"
  | "crypto_estimations";

/**
 * Immediately cancel the real-time streams of messages of given type.
 */
export interface ForgetAllRequest {
  /**
   * Cancel all streams by type. The value can be either a single type e.g. `"ticks"`, or an array of multiple types e.g. `["candles", "ticks"]`.
   */
  forget_all: StreamTypes | StreamTypes[];
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * IDs of the cancelled streams
 */
export type ForgetAll = unknown[];

/**
 * The result of forget all request made.
 */
export interface ForgetAllResponse {
  forget_all?: ForgetAll;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "forget_all";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Immediately cancel the real-time stream of messages with a specific ID.
 */
export interface ForgetRequest {
  /**
   * ID of the real-time stream of messages to cancel.
   */
  forget: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * If set to 1, stream exited and stopped. If set to 0, stream did not exist.
 */
export type Forget = 0 | 1;

/**
 * The result of forget request made.
 */
export interface ForgetResponse {
  forget?: Forget;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "forget";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Retrieves the exchange rate from a base currency to a target currency supported by the system.
 */
export interface ExchangeRatesRequest {
  /**
   * Must be `1`
   */
  exchange_rates: 1;
  /**
   * Base currency (can be obtained from `payout_currencies` call)
   */
  base_currency: string;
  /**
   * [Optional] 1 - Request for ask and bid rates along with the spot rate. Only available if target_currency is provided.
   */
  include_spread?: 1;
  /**
   * [Optional] 1 - to initiate a realtime stream of exchange rates relative to base currency.
   */
  subscribe?: 1;
  /**
   * [Optional] Target currency for the exchange rate. If subscribe is set, target_currency must be specified as well.
   */
  target_currency?: string;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * The exchange rate values from the specified base currency to the specified target currency supported by the system.
 */
export interface ExchangeRatesResponse {
  exchange_rates?: ExchangeRates;
  subscription?: SubscriptionInformation;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "exchange_rates";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Exchange rate values from base to target currency
 */
export interface ExchangeRates {
  /**
   * Base currency
   */
  base_currency?: string;
  /**
   * Date retrieval epoch time represented as an integer number
   */
  date?: number;
  /**
   * Rate of exchanging a unit of base currency into a target currency
   */
  rates?: {
    /**
     * The rate of exchanging a unit of the base currency into a target currency (represented by the key)
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[a-zA-Z0-9]{2,20}$".
     */
    [k: string]: (
      | {
          /**
           * [Optional] The ask rate of exchanging a unit of the base currency into a target currency
           */
          ask_rate?: number;
          /**
           * [Optional] The bid rate of exchanging a unit of the base currency into a target currency
           */
          bid_rate?: number;
          /**
           * The spot rate of exchanging a unit of the base currency into a target currency
           */
          spot_rate: number;
        }
      | number
    ) &
      (
        | (number &
            (
              | {
                  /**
                   * [Optional] The ask rate of exchanging a unit of the base currency into a target currency
                   */
                  ask_rate?: number;
                  /**
                   * [Optional] The bid rate of exchanging a unit of the base currency into a target currency
                   */
                  bid_rate?: number;
                  /**
                   * The spot rate of exchanging a unit of the base currency into a target currency
                   */
                  spot_rate: number;
                }
              | number
            ))
        | (
            | {
                /**
                 * [Optional] The ask rate of exchanging a unit of the base currency into a target currency
                 */
                ask_rate?: number;
                /**
                 * [Optional] The bid rate of exchanging a unit of the base currency into a target currency
                 */
                bid_rate?: number;
                /**
                 * The spot rate of exchanging a unit of the base currency into a target currency
                 */
                spot_rate: number;
              }
            | number
          )
      );
  };
}
/**
 * For subscription requests only.
 */
export interface SubscriptionInformation {
  /**
   * A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.
   */
  id: string;
}
/**
 * Specify a currency to receive a list of events related to that specific currency. For example, specifying USD will return a list of USD-related events. If the currency is omitted, you will receive a list for all currencies.
 */
export interface EconomicCalendarRequest {
  /**
   * Must be `1`
   */
  economic_calendar: 1;
  /**
   * [Optional] Currency symbol.
   */
  currency?: string;
  /**
   * [Optional] End date.
   */
  end_date?: number;
  /**
   * [Optional] Start date.
   */
  start_date?: number;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * A list of economic events.
 */
export interface EconomicCalendarResponse {
  economic_calendar?: EconomicCalendar;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "economic_calendar";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Economic calendar.
 */
export interface EconomicCalendar {
  /**
   * Array of economic events
   */
  events?: {
    /**
     * Actual value.
     */
    actual?: {
      /**
       * Actual value.
       */
      display_value?: string;
    };
    /**
     * Currency symbol.
     */
    currency?: string;
    /**
     * Event name.
     */
    event_name?: string;
    /**
     * Forecasted value.
     */
    forecast?: {
      /**
       * Forecasted value.
       */
      display_value?: string;
    };
    /**
     * Impact.
     */
    impact?: number;
    /**
     * Previous value.
     */
    previous?: {
      /**
       * Previous value.
       */
      display_value?: string;
    };
    /**
     * Release date.
     */
    release_date?: number;
  }[];
}
/**
 * Request KYC information from client
 */
export interface DocumentUploadRequest {
  /**
   * Must be `1`
   */
  document_upload: 1;
  /**
   * Document file format
   */
  document_format: "PNG" | "JPG" | "JPEG" | "GIF" | "PDF";
  /**
   * [Optional] Document ID (required for Passport, Proof of ID and Driver's License)
   */
  document_id?: string;
  /**
   * 2-letter country code, mandatory for POI only
   */
  document_issuing_country?: string;
  /**
   * Document type
   */
  document_type:
    | "passport"
    | "national_identity_card"
    | "identification_number_document"
    | "service_id_card"
    | "driving_licence"
    | "utility_bill"
    | "bankstatement"
    | "bank_statement"
    | "power_of_attorney"
    | "amlglobalcheck"
    | "docverification"
    | "proofid"
    | "driverslicense"
    | "proofaddress"
    | "other"
    | "voter_card"
    | "student_card"
    | "nimc_slip"
    | "birth_certificate"
    | "pan_card"
    | "tax_photo_id"
    | "selfie_with_id"
    | "poi_others"
    | "insurance_bill"
    | "tax_receipt"
    | "phone_bill"
    | "poa_others"
    | "proof_of_ownership"
    | "tax_return"
    | "employment_contract"
    | "brokerage statement"
    | "payslip"
    | "edd_others"
    | "coi"
    | "business_poa"
    | "article_of_association"
    | "memorandum"
    | "authorisation_letter"
    | "declarations"
    | "affidavit"
    | "official_letter"
    | "rental_agreement"
    | "business_documents_others";
  /**
   * The checksum of the file to be uploaded
   */
  expected_checksum: string;
  /**
   * [Optional] Document expiration date (required for Passport, Proof of ID and Driver's License)
   */
  expiration_date?: string;
  /**
   * Document size (should be less than 10MB)
   */
  file_size: number;
  /**
   * [Optional] Boolean value that indicates whether this document is lifetime valid (only applies to POI document types, cancels out the expiration_date given if any)
   */
  lifetime_valid?: 0 | 1;
  /**
   * [Optional] To determine document side
   */
  page_type?: "front" | "back" | "photo";
  /**
   * [Optional] It contains info about the proof of ownership being uploaded (mandatory for proof_of_ownership document type)
   */
  proof_of_ownership?: {
    /**
     * A collection of unspecific information related to the proof of ownership being uploaded
     */
    details: {
      [k: string]: unknown;
    };
    /**
     * The id of the proof of ownership as shown in the /get_account_status proof of ownership list
     */
    id: number;
  };
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Receive details of uploaded authentication documents
 */
export interface DocumentUploadResponse {
  document_upload?: DocumentUpload;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "document_upload";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Details of the uploaded documents.
 */
export interface DocumentUpload {
  /**
   * Current call type, add this to your binary payload metadata
   */
  call_type: number;
  /**
   * Hex encoded SHA-1 checksum of the file
   */
  checksum?: string;
  /**
   * 2-letter country code
   */
  document_issuing_country?: string;
  /**
   * File size
   */
  size?: number;
  /**
   * Upload status (`success` or `failure`)
   */
  status?: string;
  /**
   * Current upload ID, add this to your binary payload metadata
   */
  upload_id: number;
}
/**
 * Get the current estimations for cryptocurrencies. E.g. Withdrawal fee.
 */
export interface CryptocurrencyEstimationsRequest {
  /**
   * Must be `1`
   */
  crypto_estimations: 1;
  /**
   * Cryptocurrency code for which fee estimation is provided.
   */
  currency_code: string;
  /**
   * [Optional] If set to 1, will send updates whenever there is an update to crypto estimations.
   */
  subscribe?: 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Latest cryptocurrency estimations.
 */
export interface CryptocurrencyEstimationsResponse {
  crypto_estimations?: CryptoEstimations;
  subscription?: SubscriptionInformation;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "crypto_estimations";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Cryptocurrency estimations. E.g. Withdrawal fee estimations.
 */
export interface CryptoEstimations {
  /**
   * Cryptocurrency code
   *
   * This interface was referenced by `CryptoEstimations`'s JSON-Schema definition
   * via the `patternProperty` "^[a-zA-Z0-9]{2,20}$".
   */
  [k: string]: {
    /**
     * Estimated fee for crypto withdrawal calculated based on the current network conditions.
     */
    withdrawal_fee?: {
      /**
       * Expiry time for the estimated fee in epoch.
       */
      expiry_time?: number;
      /**
       * Unique identifier for the estimated fee which allows locking the fee for a client.
       */
      unique_id?: string;
      /**
       * Value of current estimated fee.
       */
      value?: number;
    };
  };
}
/**
 * For subscription requests only.
 */
export interface SubscriptionInformation {
  /**
   * A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.
   */
  id: string;
}
/**
 * The request for cryptocurrencies configuration.
 */
export interface CryptocurrencyConfigurationsRequest {
  /**
   * Must be `1`
   */
  crypto_config: 1;
  /**
   * [Optional] Cryptocurrency code. Sending request with currency_code provides crypto config for the sent cryptocurrency code only.
   */
  currency_code?: string;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * The response will display the configuration details related to cryptocurrencies
 */
export interface CryptocurrencyConfigurationsResponse {
  crypto_config?: CryptoConfig;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "crypto_config";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Provides cryptocurrencies configuration.
 */
export interface CryptoConfig {
  /**
   * Currency configuration including limitiations for each crypto currency.
   */
  currencies_config: {
    /**
     * Cryptocurrency code
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[a-zA-Z0-9]{2,20}$".
     */
    [k: string]: {
      /**
       * Indicates whether Priority Withdrawal is enabled for the cryptocurrency.
       */
      is_priority_withdrawal_enabled?: 0 | 1;
      /**
       * Minimum deposit amount in corresponding cryptocurrency value.
       */
      minimum_deposit?: number;
      /**
       * Minimum withdrawal for the cryptocurrency in USD.
       */
      minimum_withdrawal?: number;
    };
  };
}
/**
 * Retrieve performance, trading, risk and copiers statistics of trader.
 */
export interface CopyTradingStatisticsRequest {
  /**
   * Must be `1`
   */
  copytrading_statistics: 1;
  /**
   * The ID of the target trader.
   */
  trader_id: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * The statistics of the trader.
 */
export interface CopyTradingStatisticsResponse {
  copytrading_statistics?: CopytradingStatistics;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "copytrading_statistics";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Statistics of the trader
 */
export interface CopytradingStatistics {
  /**
   * This is the epoch the investor started trading.
   */
  active_since: number;
  /**
   * Average seconds of keeping positions open.
   */
  avg_duration: number;
  /**
   * Average loss of trades in percentage.
   */
  avg_loss: number;
  /**
   * Average profitable trades in percentage.
   */
  avg_profit: number;
  /**
   * Number of copiers for this trader.
   */
  copiers: number;
  /**
   * Represents the net change in equity for a 12-month period.
   */
  last_12months_profitable_trades: number;
  /**
   * Represents the net change in equity per month.
   */
  monthly_profitable_trades: {
    /**
     * Monthly profitable trades in percentage.
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[0-9]{4}\-[0-9]{2}$".
     */
    [k: string]: number;
  };
  /**
   * Trader performance probability.
   */
  performance_probability: number;
  /**
   * Total number of trades for all time.
   */
  total_trades: number;
  /**
   * Represents the portfolio distribution by markets.
   */
  trades_breakdown: {
    /**
     * Number of trades in percentage.
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^\w+$".
     */
    [k: string]: number;
  };
  /**
   * Number of profit trades in percentage.
   */
  trades_profitable: number;
  /**
   * Represents the net change in equity per year.
   */
  yearly_profitable_trades?: {
    /**
     * Yearly profitable trades in percentage.
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[0-9]{4}$".
     */
    [k: string]: number;
  };
}
/**
 * Retrieves a list of active copiers and/or traders for Copy Trading
 */
export interface CopyTradingListRequest {
  /**
   * Must be `1`
   */
  copytrading_list: 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Details of copiers and/or traders for Copy Trading
 */
export interface CopyTradingListResponse {
  copytrading_list?: CopytradingList;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "copytrading_list";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * The trading information of copiers or traders.
 */
export interface CopytradingList {
  /**
   * List of users who are currently copy trading the authenticated user
   */
  copiers: {
    /**
     * The loginid of the copier's account.
     */
    loginid: string;
  }[];
  /**
   * List of traders being followed by the authenticated user
   */
  traders: {
    /**
     * The list of assets to copy the trades of.
     */
    assets?: string[];
    /**
     * The loginid of the trader's account.
     */
    loginid?: string;
    /**
     * Maximum trading stake set for the trader.
     */
    max_trade_stake?: null | number;
    /**
     * Minimum trading stake set for the trader.
     */
    min_trade_stake?: null | number;
    /**
     * The token provided for the trader.
     */
    token?: string;
    /**
     * The type of trades set.
     */
    trade_types?: string[];
  }[];
}
/**
 * Stop copy trader bets
 */
export interface CopyTradingStopRequest {
  /**
   * API tokens identifying the accounts which needs not to be copied
   */
  copy_stop: string;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Copy stopping confirmation. Returns 1 is success.
 */
export type CopyStop = number;

/**
 * A message with results is received
 */
export interface CopyTradingStopResponse {
  copy_stop?: CopyStop;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "copy_stop";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Start copy trader bets
 */
export interface CopyTradingStartRequest {
  /**
   * API tokens identifying the accounts of trader which will be used to copy trades
   */
  copy_start: string;
  /**
   * [Optional] Used to set assets to be copied. E.x ["frxUSDJPY", "R_50"]
   */
  assets?: string | string[];
  /**
   * [Optional] Used to set maximum trade stake to be copied.
   */
  max_trade_stake?: number;
  /**
   * [Optional] Used to set minimal trade stake to be copied.
   */
  min_trade_stake?: number;
  /**
   * [Optional] Used to set trade types to be copied. E.x ["CALL", "PUT"]
   */
  trade_types?: string | string[];
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Copy start confirmation. Returns 1 is success.
 */
export type CopyStart = number;

/**
 * A message with results is received
 */
export interface CopyTradingStartResponse {
  copy_start?: CopyStart;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "copy_start";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Get the list of currently available contracts for a given landing company.
 */
export interface ContractsForCompanyRequest {
  /**
   * Must be `1`
   */
  contracts_for_company: 1;
  /**
   * [Optional] Indicates which landing company to get a list of contracts for. If you are logged in, your account's landing company will override this field.
   */
  landing_company?: "iom" | "malta" | "maltainvest" | "svg" | "virtual" | "vanuatu";
  /**
   * [Optional] The login id of the user. If left unspecified, it defaults to the initial authorized token's login id.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Get the list of currently available contracts for a given landing company.
 */
export interface ContractsForCompanyResponse {
  contracts_for_company?: ContractsForCompany;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "contracts_for_company";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * List of available contracts for a given landing company.
 */
export interface ContractsForCompany {
  /**
   * List of available contracts.
   *
   * @minItems 1
   */
  available: [
    {
      /**
       * Category of contract barrier.
       */
      barrier_category: string;
      /**
       * Category of contract.
       */
      contract_category: string;
      /**
       * Display name for the contract category, localized to selected language.
       */
      contract_category_display: string;
      /**
       * Display name for the contract, localized to selected language.
       */
      contract_display: string;
      /**
       * Type of contract.
       */
      contract_type: string;
      /**
       * Default stake for the contract
       */
      default_stake?: number;
      /**
       * Type of sentiment.
       */
      sentiment: string;
    },
    ...{
      /**
       * Category of contract barrier.
       */
      barrier_category: string;
      /**
       * Category of contract.
       */
      contract_category: string;
      /**
       * Display name for the contract category, localized to selected language.
       */
      contract_category_display: string;
      /**
       * Display name for the contract, localized to selected language.
       */
      contract_display: string;
      /**
       * Type of contract.
       */
      contract_type: string;
      /**
       * Default stake for the contract
       */
      default_stake?: number;
      /**
       * Type of sentiment.
       */
      sentiment: string;
    }[]
  ];
  /**
   * Count of contracts available
   */
  hit_count: number;
}
/**
 * For a given symbol, get the list of currently available contracts, and the latest barrier and duration limits for each contract.
 */
export interface ContractsForSymbolRequest {
  /**
   * The short symbol name (obtained from `active_symbols` call).
   */
  contracts_for: string;
  /**
   * [Optional] Currency of the contract's stake and payout (obtained from `payout_currencies` call).
   */
  currency?: string;
  /**
   * Deprecated - Replaced by landing_company_short.
   */
  landing_company?: "iom" | "malta" | "maltainvest" | "svg" | "virtual" | "vanuatu";
  /**
   * [Optional] Indicates which landing company to get a list of contracts for. If you are logged in, your account's landing company will override this field. Note that when landing_company_short is set to 'virtual', landing_company will take precendce until the deprecated field is removed from the api.
   */
  landing_company_short?: "iom" | "malta" | "maltainvest" | "svg" | "virtual" | "vanuatu";
  /**
   * [Optional] If you specify this field, only contracts tradable through that contract type will be returned.
   */
  product_type?: "basic";
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Get the list of currently available contracts
 */
export interface ContractsForSymbolResponse {
  contracts_for?: ContractsFor;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "contracts_for";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * List of available contracts. Note: if the user is authenticated, then only contracts allowed under his account will be returned.
 */
export interface ContractsFor {
  /**
   * Array of available contracts details
   *
   * @minItems 1
   */
  available: [
    {
      /**
       * Array of available barriers for a predefined trading period
       *
       * @minItems 1
       */
      available_barriers?: [unknown, ...unknown[]];
      /**
       * Barrier Details.
       */
      barrier?: null | string;
      /**
       * Category of barrier.
       */
      barrier_category: string;
      /**
       * [Only for Vanilla] Barrier Choices
       */
      barrier_choices?: unknown[];
      /**
       * Number of barriers.
       */
      barriers: number;
      /**
       * Cancellation range
       */
      cancellation_range?: unknown[];
      /**
       * Category of contract.
       */
      contract_category: string;
      /**
       * Category of the contract.
       */
      contract_category_display: string;
      /**
       * Display name for the type of contract.
       */
      contract_display?: string;
      /**
       * Type of contract.
       */
      contract_type: string;
      /**
       * Default stake for the contract
       */
      default_stake?: number;
      /**
       * [Only for Turbos] Its selected payout per point
       */
      display_number_of_contracts?: number;
      /**
       * Name of exchange
       */
      exchange_name: string;
      /**
       * Array of barriers already expired
       */
      expired_barriers?: unknown[];
      /**
       * Expiry Type.
       */
      expiry_type: string;
      /**
       * Array of returned forward starting options
       *
       * @minItems 1
       */
      forward_starting_options?: [
        {
          /**
           * The epoch value for the blackouts of forward starting session.
           */
          blackouts?: unknown[];
          /**
           * The epoch value for the closing date of forward starting session.
           */
          close?: string;
          /**
           * The epoch value for the date of forward starting session.
           */
          date?: string;
          /**
           * The epoch value for the opening date of forward starting session.
           */
          open?: string;
        },
        ...{
          /**
           * The epoch value for the blackouts of forward starting session.
           */
          blackouts?: unknown[];
          /**
           * The epoch value for the closing date of forward starting session.
           */
          close?: string;
          /**
           * The epoch value for the date of forward starting session.
           */
          date?: string;
          /**
           * The epoch value for the opening date of forward starting session.
           */
          open?: string;
        }[]
      ];
      /**
       * Growth rate range.
       */
      growth_rate_range?: unknown[];
      /**
       * High barrier Details.
       */
      high_barrier?: null | string;
      /**
       * Last digit range
       */
      last_digit_range?: unknown[];
      /**
       * Low barrier Details.
       */
      low_barrier?: null | string;
      /**
       * Type of market.
       */
      market: string;
      /**
       * Maximum contract duration
       */
      max_contract_duration: string;
      /**
       * [Only for turbos options] Maximum contract stake
       */
      max_stake?: null | number;
      /**
       * Minimum contract duration.
       */
      min_contract_duration: string;
      /**
       * [Only for turbos options] Minimum contract stake
       */
      min_stake?: null | number;
      /**
       * Multiplier range.
       */
      multiplier_range?: unknown[];
      /**
       * [Only for Turbos] Payout Choices
       */
      payout_choices?: unknown[];
      /**
       * Maximum payout.
       */
      payout_limit?: number;
      /**
       * Type of sentiment.
       */
      sentiment: string;
      /**
       * Start Type.
       */
      start_type: string;
      /**
       * Type of submarket.
       */
      submarket: string;
      /**
       * A hash of predefined trading period
       */
      trading_period?: {
        [k: string]: unknown;
      };
      /**
       * Symbol code
       */
      underlying_symbol: string;
    },
    ...{
      /**
       * Array of available barriers for a predefined trading period
       *
       * @minItems 1
       */
      available_barriers?: [unknown, ...unknown[]];
      /**
       * Barrier Details.
       */
      barrier?: null | string;
      /**
       * Category of barrier.
       */
      barrier_category: string;
      /**
       * [Only for Vanilla] Barrier Choices
       */
      barrier_choices?: unknown[];
      /**
       * Number of barriers.
       */
      barriers: number;
      /**
       * Cancellation range
       */
      cancellation_range?: unknown[];
      /**
       * Category of contract.
       */
      contract_category: string;
      /**
       * Category of the contract.
       */
      contract_category_display: string;
      /**
       * Display name for the type of contract.
       */
      contract_display?: string;
      /**
       * Type of contract.
       */
      contract_type: string;
      /**
       * Default stake for the contract
       */
      default_stake?: number;
      /**
       * [Only for Turbos] Its selected payout per point
       */
      display_number_of_contracts?: number;
      /**
       * Name of exchange
       */
      exchange_name: string;
      /**
       * Array of barriers already expired
       */
      expired_barriers?: unknown[];
      /**
       * Expiry Type.
       */
      expiry_type: string;
      /**
       * Array of returned forward starting options
       *
       * @minItems 1
       */
      forward_starting_options?: [
        {
          /**
           * The epoch value for the blackouts of forward starting session.
           */
          blackouts?: unknown[];
          /**
           * The epoch value for the closing date of forward starting session.
           */
          close?: string;
          /**
           * The epoch value for the date of forward starting session.
           */
          date?: string;
          /**
           * The epoch value for the opening date of forward starting session.
           */
          open?: string;
        },
        ...{
          /**
           * The epoch value for the blackouts of forward starting session.
           */
          blackouts?: unknown[];
          /**
           * The epoch value for the closing date of forward starting session.
           */
          close?: string;
          /**
           * The epoch value for the date of forward starting session.
           */
          date?: string;
          /**
           * The epoch value for the opening date of forward starting session.
           */
          open?: string;
        }[]
      ];
      /**
       * Growth rate range.
       */
      growth_rate_range?: unknown[];
      /**
       * High barrier Details.
       */
      high_barrier?: null | string;
      /**
       * Last digit range
       */
      last_digit_range?: unknown[];
      /**
       * Low barrier Details.
       */
      low_barrier?: null | string;
      /**
       * Type of market.
       */
      market: string;
      /**
       * Maximum contract duration
       */
      max_contract_duration: string;
      /**
       * [Only for turbos options] Maximum contract stake
       */
      max_stake?: null | number;
      /**
       * Minimum contract duration.
       */
      min_contract_duration: string;
      /**
       * [Only for turbos options] Minimum contract stake
       */
      min_stake?: null | number;
      /**
       * Multiplier range.
       */
      multiplier_range?: unknown[];
      /**
       * [Only for Turbos] Payout Choices
       */
      payout_choices?: unknown[];
      /**
       * Maximum payout.
       */
      payout_limit?: number;
      /**
       * Type of sentiment.
       */
      sentiment: string;
      /**
       * Start Type.
       */
      start_type: string;
      /**
       * Type of submarket.
       */
      submarket: string;
      /**
       * A hash of predefined trading period
       */
      trading_period?: {
        [k: string]: unknown;
      };
      /**
       * Symbol code
       */
      underlying_symbol: string;
    }[]
  ];
  /**
   * Symbol's next market-close time as an epoch value
   */
  close?: number | null;
  /**
   * Indicates the feed license for symbol, for example whether its realtime or delayed
   */
  feed_license?: string;
  /**
   * Count of contracts available
   */
  hit_count?: number;
  /**
   * Array of non_available contracts details
   */
  non_available?: unknown[];
  /**
   * Symbol's next market-open time as an epoch value
   */
  open?: number | null;
  /**
   * Current spot price for this underlying
   */
  spot?: null | number;
}
/**
 * Request for contract update history.
 */
export interface UpdateContractHistoryRequest {
  /**
   * Must be `1`
   */
  contract_update_history: 1;
  /**
   * Internal unique contract identifier.
   */
  contract_id: number;
  /**
   * [Optional] Maximum number of historical updates to receive.
   */
  limit?: number;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Contains the historical and the most recent update status of the contract
 */
export type ContractUpdateHistory = {
  /**
   * Display name of the changed parameter.
   */
  display_name?: string;
  /**
   * The amount.
   */
  order_amount?: string;
  /**
   * The epoch when the changed was done.
   */
  order_date?: number;
  /**
   * The contract parameter updated.
   */
  order_type?: string;
  /**
   * The pip-sized barrier value.
   */
  value?: null | string;
}[];

/**
 * Contract update history status
 */
export interface UpdateContractHistoryResponse {
  contract_update_history?: ContractUpdateHistory;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "contract_update_history";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Update a contract condition.
 */
export interface UpdateContractRequest {
  /**
   * Must be `1`
   */
  contract_update: 1;
  /**
   * Internal unique contract identifier.
   */
  contract_id: number;
  /**
   * Specify limit order to update.
   */
  limit_order: {
    /**
     * New stop loss value for a contract. To cancel, pass `null`.
     */
    stop_loss?: null | number;
    /**
     * New take profit value for a contract. To cancel, pass `null`.
     */
    take_profit?: null | number;
  };
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Contract update status
 */
export interface UpdateContractResponse {
  contract_update?: ContractUpdate;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "contract_update";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Contains the update status of the request
 */
export interface ContractUpdate {
  /**
   * The target spot price where the contract will be closed automatically at the loss specified by the user.
   */
  stop_loss?: {
    /**
     * Localized display name
     */
    display_name?: string;
    /**
     * Stop loss amount
     */
    order_amount?: null | number;
    /**
     * Stop loss order epoch
     */
    order_date?: number;
    /**
     * Stop loss pip-sized barrier value
     */
    value?: null | string;
  };
  /**
   * The target spot price where the contract will be closed automatically at the profit specified by the user.
   */
  take_profit?: {
    /**
     * Localized display name
     */
    display_name?: string;
    /**
     * Take profit amount
     */
    order_amount?: null | number;
    /**
     * Take profit order epoch
     */
    order_date?: number;
    /**
     * Take profit pip-sized barrier value
     */
    value?: null | string;
  };
}
/**
 * Verifies the email for the user using verification code passed in the request object
 */
export interface ConfirmEmailThroughVerificationCodeRequest {
  /**
   * Must be `1`
   */
  confirm_email: 1;
  /**
   * Boolean value: 1 or 0, indicating whether the client has given consent for marketing emails.
   */
  email_consent: 1 | 0;
  /**
   * Email verification code (received from a `verify_email` call, which must be done first).
   */
  verification_code: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * 1 for success (The verification code has been successfully verified)
 */
export type ConfirmEmail = 0 | 1;

/**
 * Confirm Email Response
 */
export interface ConfirmEmailThroughVerificationCodeResponse {
  confirm_email?: ConfirmEmail;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "confirm_email";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Request the cashier info for the specified type.
 */
export interface CashierInformationRequest {
  /**
   * Operation which needs to be requested from cashier
   */
  cashier: "deposit" | "withdraw";
  /**
   * [Optional] Address for crypto withdrawal. Only applicable for `api` type.
   */
  address?: string;
  /**
   * [Optional] Amount for crypto withdrawal. Only applicable for `api` type.
   */
  amount?: number;
  /**
   * [Optional] If set to `1`, only validation is performed. Only applicable for `withdraw` using `crypto` provider and `api` type.
   */
  dry_run?: 0 | 1;
  /**
   * [Optional] The `unique_id` of the estimated fee received from `crypto_estimations` call in case the client is willing to pay the returned fee in order to prioritise their withdrawal request.
   */
  estimated_fee_unique_id?: string;
  /**
   * [Optional] Cashier provider.
   */
  provider?: "doughflow" | "crypto";
  /**
   * [Optional] Data is returned from the cashier. The `crypto` provider only supports `api` (not `url`) for crypto accounts.
   */
  type?: "url" | "api";
  /**
   * [Optional] Email verification code (received from a `verify_email` call, which must be done first)
   */
  verification_code?: string;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Possible error codes are:
 * - `ASK_TNC_APPROVAL`: API call `tnc_approval`
 * - `ASK_AUTHENTICATE`
 * - `ASK_UK_FUNDS_PROTECTION`: API call `tnc_approval`
 * - `ASK_CURRENCY`: API call `set_account_currency`
 * - `ASK_EMAIL_VERIFY`: API call `verify_email`
 * - `ASK_FIX_DETAILS`: API call `set_settings`
 */
export type Cashier =
  | string
  | {
      /**
       * Type of operation, which is requested.
       */
      action: "deposit" | "withdraw";
      /**
       * [Optional] Result for `deposit` action.
       */
      deposit?: {
        /**
         * Address for crypto deposit.
         */
        address: string;
        [k: string]: unknown;
      };
      /**
       * [Optional] Result for `withdraw` action.
       */
      withdraw?: WithdrawOperation | DryRunValidation;
      [k: string]: unknown;
    };

/**
 * Cashier information for the specified type.
 */
export interface CashierInformationResponse {
  cashier?: Cashier;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "cashier";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Result for withdraw operation.
 */
export interface WithdrawOperation {
  /**
   * The unique identifier for the transaction.
   */
  id: string;
  /**
   * The status code of the withdrawal.
   */
  status_code: "LOCKED";
  /**
   * The status message of the withdrawal.
   */
  status_message: string;
  [k: string]: unknown;
}
/**
 * Result for `dry_run` validation.
 */
export interface DryRunValidation {
  /**
   * The `dry_run` was successful.
   */
  dry_run: 1;
  [k: string]: unknown;
}
/**
 * Cancel contract with contract id
 */
export interface CancelAContractRequest {
  /**
   * Value should be the `contract_id` which received from the `portfolio` call.
   */
  cancel: number;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * A message with transaction results is received
 */
export interface CancelAContractResponse {
  cancel?: Cancel;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "cancel";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Receipt for the transaction
 */
export interface Cancel {
  /**
   * New account balance after completion of the sale
   */
  balance_after?: number;
  /**
   * Internal contract identifier for the sold contract
   */
  contract_id?: number;
  /**
   * Internal transaction identifier for the corresponding buy transaction
   */
  reference_id?: number;
  /**
   * Actual effected sale price
   */
  sold_for?: number;
  /**
   * Internal transaction identifier for the sale transaction
   */
  transaction_id?: number;
}
/**
 * Buy a Contract for multiple Accounts specified by the `tokens` parameter. Note, although this is an authorized call, the contract is not bought for the authorized account.
 */
export interface BuyContractForMultipleAccountsRequest {
  /**
   * Either the ID received from a Price Proposal (`proposal` call), or `1` if contract buy parameters are passed in the `parameters` field.
   */
  buy_contract_for_multiple_accounts: string;
  /**
   * [Optional] Used to pass the parameters for contract buy.
   */
  parameters?: {
    /**
     * [Optional] Proposed `payout` or `stake` value
     */
    amount?: number;
    /**
     * [Optional] Markup added to contract prices (as a percentage of contract payout)
     */
    app_markup_percentage?: number;
    /**
     * [Optional] Barrier for the contract (or last digit prediction for digit contracts). Contracts less than 24 hours in duration would need a relative barrier (barriers which need +/-), where entry spot would be adjusted accordingly with that amount to define a barrier, except for Synthetic Indices as they support both relative and absolute barriers.
     */
    barrier?: string;
    /**
     * [Optional] Low barrier for the contract (for contracts with two barriers). Contracts less than 24 hours in duration would need a relative barrier (barriers which need +/-), where entry spot would be adjusted accordingly with that amount to define a barrier, except for Synthetic Indices as they support both relative and absolute barriers.
     */
    barrier2?: string;
    /**
     * [Optional] Indicate whether amount is 'payout' or 'stake'.
     */
    basis?: "payout" | "stake";
    /**
     * A valid contract-type
     */
    contract_type:
      | "MULTUP"
      | "MULTDOWN"
      | "UPORDOWN"
      | "EXPIRYRANGE"
      | "ONETOUCH"
      | "CALLE"
      | "LBHIGHLOW"
      | "ASIAND"
      | "EXPIRYRANGEE"
      | "DIGITDIFF"
      | "DIGITMATCH"
      | "DIGITOVER"
      | "PUTE"
      | "DIGITUNDER"
      | "NOTOUCH"
      | "CALL"
      | "RANGE"
      | "LBFLOATPUT"
      | "DIGITODD"
      | "PUT"
      | "ASIANU"
      | "LBFLOATCALL"
      | "EXPIRYMISSE"
      | "EXPIRYMISS"
      | "DIGITEVEN"
      | "TICKHIGH"
      | "TICKLOW"
      | "RESETCALL"
      | "RESETPUT"
      | "CALLSPREAD"
      | "PUTSPREAD"
      | "RUNHIGH"
      | "RUNLOW"
      | "VANILLALONGCALL"
      | "VANILLALONGPUT"
      | "TURBOSLONG"
      | "TURBOSSHORT";
    /**
     * This can only be the account-holder's currency
     */
    currency: string;
    /**
     * [Optional] Epoch value of the expiry time of the contract. You must either specify `date_expiry` or `duration`.
     */
    date_expiry?: number;
    /**
     * [Optional] For forward-starting contracts, epoch value of the starting time of the contract.
     */
    date_start?: number;
    /**
     * [Optional] Duration quantity
     */
    duration?: number;
    /**
     * [Optional] Duration unit is `s`: seconds, `m`: minutes, `h`: hours, `d`: days, `t`: ticks
     */
    duration_unit?: "d" | "m" | "s" | "h" | "t";
    /**
     * [Optional] The multiplier for non-binary options. E.g. lookbacks.
     */
    multiplier?: number;
    /**
     * [Optional] The tick that is predicted to have the highest/lowest value - for tickhigh and ticklow contracts.
     */
    selected_tick?: number;
    /**
     * Symbol code
     */
    symbol: string;
  };
  /**
   * Maximum price at which to purchase the contract.
   */
  price: number;
  /**
   * List of API tokens identifying the accounts for which the contract is bought. Note: If the same token appears multiple times or if multiple tokens designate the same account, the contract is bought multiple times for this account.
   */
  tokens: string[];
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * A message with transaction results is received
 */
export interface BuyContractForMultipleAccountsResponse {
  buy_contract_for_multiple_accounts?: BuyContractForMultipleAccounts;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "buy_contract_for_multiple_accounts";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Receipt confirmation for the purchase
 */
export interface BuyContractForMultipleAccounts {
  /**
   * List of results containing transactions and/or errors for the bought contracts.
   */
  result: (
    | {
        /**
         * Actual effected purchase price
         */
        buy_price: number;
        /**
         * Internal contract identifier
         */
        contract_id: number;
        /**
         * The description of contract purchased
         */
        longcode: string;
        /**
         * Proposed payout value
         */
        payout: number;
        /**
         * Epoch value of the transaction purchase time
         */
        purchase_time: number;
        /**
         * Compact description of the contract purchased
         */
        shortcode: string;
        /**
         * Epoch value showing the expected start time of the contract
         */
        start_time: number;
        /**
         * The token designating the account
         */
        token: string;
        /**
         * Internal transaction identifier
         */
        transaction_id: number;
      }
    | {
        /**
         * An error code
         */
        code: string;
        /**
         * An error message localized according to the websocket
         */
        message_to_client: string;
        /**
         * The token designating the account
         */
        token: string;
      }
  )[];
}
/**
 * Buy a Contract
 */
export interface BuyContractRequest {
  /**
   * Either the ID received from a Price Proposal (`proposal` call), or `1` if contract buy parameters are passed in the `parameters` field.
   */
  buy: string;
  /**
   * [Optional] Used to pass the parameters for contract buy.
   */
  parameters?: {
    /**
     * [Optional] Proposed payout or stake value
     */
    amount?: number;
    /**
     * [Optional] Markup added to contract prices (as a percentage of contract payout)
     */
    app_markup_percentage?: number;
    /**
     * [Optional] Barrier for the contract (or last digit prediction for digit contracts). Contracts less than 24 hours in duration would need a relative barrier (barriers which need +/-), where entry spot would be adjusted accordingly with that amount to define a barrier, except for Synthetic Indices as they support both relative and absolute barriers.
     */
    barrier?: string;
    /**
     * [Optional] Low barrier for the contract (for contracts with two barriers). Contracts less than 24 hours in duration would need a relative barrier (barriers which need +/-), where entry spot would be adjusted accordingly with that amount to define a barrier, except for Synthetic Indices as they support both relative and absolute barriers.
     */
    barrier2?: string;
    /**
     * [Optional] Barrier range for callputspread.
     */
    barrier_range?: "tight" | "middle" | "wide";
    /**
     * [Optional] Indicates whether amount is 'payout' or 'stake' for binary options.
     */
    basis?: "payout" | "stake";
    /**
     * Cancellation duration option (only for `MULTUP` and `MULTDOWN` contracts).
     */
    cancellation?: string;
    /**
     * A valid contract-type
     */
    contract_type:
      | "MULTUP"
      | "MULTDOWN"
      | "UPORDOWN"
      | "EXPIRYRANGE"
      | "ONETOUCH"
      | "CALLE"
      | "LBHIGHLOW"
      | "ASIAND"
      | "EXPIRYRANGEE"
      | "DIGITDIFF"
      | "DIGITMATCH"
      | "DIGITOVER"
      | "PUTE"
      | "DIGITUNDER"
      | "NOTOUCH"
      | "CALL"
      | "RANGE"
      | "LBFLOATPUT"
      | "DIGITODD"
      | "PUT"
      | "ASIANU"
      | "LBFLOATCALL"
      | "EXPIRYMISSE"
      | "EXPIRYMISS"
      | "DIGITEVEN"
      | "TICKHIGH"
      | "TICKLOW"
      | "RESETCALL"
      | "RESETPUT"
      | "CALLSPREAD"
      | "PUTSPREAD"
      | "RUNHIGH"
      | "RUNLOW"
      | "ACCU"
      | "VANILLALONGCALL"
      | "VANILLALONGPUT"
      | "TURBOSLONG"
      | "TURBOSSHORT";
    /**
     * This can only be the account-holder's currency
     */
    currency: string;
    /**
     * [Optional] Epoch value of the expiry time of the contract. You must either specify date_expiry or duration.
     */
    date_expiry?: number;
    /**
     * [Optional] For forward-starting contracts, epoch value of the starting time of the contract.
     */
    date_start?: number;
    /**
     * [Optional] Duration quantity
     */
    duration?: number;
    /**
     * [Optional] Duration unit is `s`: seconds, `m`: minutes, `h`: hours, `d`: days, `t`: ticks
     */
    duration_unit?: "d" | "m" | "s" | "h" | "t";
    /**
     * [Optional] Growth rate of an accumulator contract.
     */
    growth_rate?: number;
    /**
     * Add an order to close the contract once the order condition is met (only for `MULTUP` and `MULTDOWN` and `ACCU` contracts).
     */
    limit_order?: {
      /**
       * Contract will be automatically closed when the value of the contract reaches a specific loss.
       */
      stop_loss?: number;
      /**
       * Contract will be automatically closed when the value of the contract reaches a specific profit.
       */
      take_profit?: number;
    };
    /**
     * [Optional] The multiplier for non-binary options. E.g. lookbacks.
     */
    multiplier?: number;
    /**
     * [Optional] Clients can provide payout_per_point directly, and the barrier will be calculated based on this payout_per_point value.
     */
    payout_per_point?: number;
    /**
     * [Optional] The product type.
     */
    product_type?: "basic";
    /**
     * [Optional] The tick that is predicted to have the highest/lowest value - for tickhigh and ticklow contracts.
     */
    selected_tick?: number;
    /**
     * Symbol code
     */
    symbol: string;
    /**
     * [Optional] An epoch value of a predefined trading period start time
     */
    trading_period_start?: number;
  };
  /**
   * Maximum price at which to purchase the contract.
   */
  price: number;
  /**
   * [Optional] `1` to stream.
   */
  subscribe?: 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * A message with transaction results is received
 */
export interface BuyContractResponse {
  buy?: Buy;
  subscription?: SubscriptionInformation;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "buy";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Receipt confirmation for the purchase
 */
export interface Buy {
  /**
   * The new account balance after completion of the purchase
   */
  balance_after: number;
  /**
   * Actual effected purchase price
   */
  buy_price: number;
  /**
   * Internal contract identifier
   */
  contract_id: number;
  /**
   * The description of contract purchased
   */
  longcode: string;
  /**
   * Proposed payout value
   */
  payout: number;
  /**
   * Epoch value of the transaction purchase time
   */
  purchase_time: number;
  /**
   * Compact description of the contract purchased
   */
  shortcode: string;
  /**
   * Epoch value showing the expected start time of the contract
   */
  start_time: number;
  /**
   * Internal transaction identifier
   */
  transaction_id: number;
}
/**
 * For subscription requests only.
 */
export interface SubscriptionInformation {
  /**
   * A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.
   */
  id: string;
}
/**
 * Get user account balance
 */
export interface BalanceRequest {
  /**
   * Must be `1`
   */
  balance: 1;
  /**
   * [Optional] If set to `all`, return the balances of all accounts one by one; if set to `current`, return the balance of current account; if set as an account id, return the balance of that account.
   */
  account?: string;
  /**
   * [Optional] If set to 1, will send updates whenever the balance changes.
   */
  subscribe?: 0 | 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Return details of user account balance
 */
export interface BalanceResponse {
  balance?: Balance;
  subscription?: SubscriptionInformation;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "balance";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Current balance of one or more accounts.
 */
export interface Balance {
  /**
   * Balance of current account.
   */
  balance: number;
  /**
   * List of active accounts.
   */
  accounts?: {
    /**
     * Individual accounts details.
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^.+[0-9]{3,}$".
     */
    [k: string]: {
      /**
       * Account balance
       */
      balance: number;
      /**
       * Account balance converted the total currency.
       */
      converted_amount: number;
      /**
       * Account currency.
       */
      currency: string;
      /**
       * If set to 1, this is a demo account.
       */
      demo_account: 0 | 1;
      /**
       * Boolean value of 1 or 0. Indicates the status of account. 1 indicates account is good and accessible.
       */
      status: 1 | 0;
      /**
       * Type of account.
       */
      type: "mt5" | "deriv";
    };
  };
  /**
   * Currency of current account.
   */
  currency: string;
  /**
   * A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.
   */
  id?: string;
  /**
   * Client loginid.
   */
  loginid: string;
  /**
   * Summary totals of accounts by type.
   */
  total?: {
    /**
     * Total balance of all real money Deriv accounts.
     */
    deriv?: {
      /**
       * Total of balances.
       */
      amount: number;
      /**
       * Currency of total.
       */
      currency: string;
    };
    /**
     * Total balance of all demo Deriv accounts.
     */
    deriv_demo?: {
      /**
       * Total of balances.
       */
      amount: number;
      /**
       * Currency of total.
       */
      currency: string;
    };
    /**
     * Total balance of all MT5 real money accounts.
     */
    mt5?: {
      /**
       * Total balance of all MT5 accounts
       */
      amount: number;
      /**
       * Currency of total.
       */
      currency: string;
    };
    /**
     * Total balance of all MT5 demo accounts.
     */
    mt5_demo?: {
      /**
       * Total of balances.
       */
      amount: number;
      /**
       * Currency of total.
       */
      currency: string;
    };
  };
}
/**
 * For subscription requests only.
 */
export interface SubscriptionInformation {
  /**
   * A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.
   */
  id: string;
}
/**
 * Authorize current WebSocket session to act on behalf of the owner of a given token. Must precede requests that need to access client account, for example purchasing and selling contracts or viewing portfolio.
 */
export interface AuthorizeRequest {
  /**
   * Authentication token. May be retrieved from https://www.binary.com/en/user/security/api_tokenws.html. Set to MULTI when using multiple tokens.
   */
  authorize: string;
  /**
   * [Optional] Send this when you use api tokens for authorization and want to track activity using `login_history` call.
   */
  add_to_login_history?: 1 | 0;
  /**
   * Additional Authentication tokens of authorized user that may be used in this session. Upto 25 tokens.
   *
   * @maxItems 25
   */
  tokens?: string[];
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * A message containing account information for the holder of that token.
 */
export interface AuthorizeResponse {
  authorize?: Authorize;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "authorize";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Account information for the holder of the token.
 */
export interface Authorize {
  /**
   * List of accounts for current user. This is also available from the `account_list` call.
   */
  account_list?: {
    /**
     * Account category.
     */
    account_category?: "trading" | "wallet";
    /**
     * Account type.
     */
    account_type?: string;
    /**
     * 2 letter broker code.
     */
    broker?: string;
    /**
     * Creation time of the account as epoch.
     */
    created_at?: number;
    /**
     * Currency of specified account.
     */
    currency?: string;
    /**
     * Currency type for the corresponding currency.
     */
    currency_type?: string;
    /**
     * Epoch of date till client has excluded him/herself from the website, only present if client is self excluded.
     */
    excluded_until?: number;
    /**
     * Boolean value: 1 or 0, indicating whether the account is marked as disabled or not.
     */
    is_disabled?: 1 | 0;
    /**
     * Boolean value: 1 or 0, indicating whether the account is a virtual-money account.
     */
    is_virtual?: 1 | 0;
    /**
     * Landing company shortcode the account belongs to.
     */
    landing_company_name?: string;
    /**
     * Details of the list of Trading accounts linked to the Wallet account.
     */
    linked_to?: {
      /**
       * Account ID.
       */
      loginid?: string;
      /**
       * Account platform name.
       */
      platform?: "ctrader" | "dtrade" | "dwallet" | "dxtrade" | "mt5";
    }[];
    /**
     * The account ID of specified account.
     */
    loginid?: string;
  }[];
  /**
   * Cash balance of the account.
   */
  balance?: number;
  /**
   * 2-letter country code (ISO standard).
   */
  country?: string;
  /**
   * Currency of the account.
   */
  currency?: string;
  /**
   * User email.
   */
  email?: string;
  /**
   * User's full name. Will be empty for virtual accounts.
   */
  fullname?: string;
  /**
   * Boolean value: 1 or 0, indicating whether the account is a virtual-money account.
   */
  is_virtual?: 0 | 1;
  /**
   * Landing company name the account belongs to.
   */
  landing_company_fullname?: string;
  /**
   * Landing company shortcode the account belongs to.
   */
  landing_company_name?: string;
  /**
   * Details of the list of Trading accounts linked to the Wallet account.
   */
  linked_to?: {
    /**
     * Account ID.
     */
    loginid?: string;
    /**
     * Account platform name.
     */
    platform?: "ctrader" | "dtrade" | "dwallet" | "dxtrade" | "mt5";
  }[];
  /**
   * Currencies in client's residence country
   */
  local_currencies?: {
    /**
     * Currency code
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[a-zA-Z0-9]{2,20}$".
     */
    [k: string]: {
      /**
       * Number of fractional digits.
       */
      fractional_digits: number;
    };
  };
  /**
   * The account ID that the token was issued for.
   */
  loginid?: string;
  /**
   * User's preferred language, ISO standard code of language
   */
  preferred_language?: null | string;
  /**
   * Scopes available to the token.
   */
  scopes?: string[];
  /**
   * List of landing company shortcodes the account can upgrade to.
   */
  upgradeable_landing_companies?: unknown[];
  /**
   * The internal user ID for this account.
   */
  user_id?: number;
}
/**
 * Retrieve a list of all available underlyings and the corresponding contract types and duration boundaries. If the user is logged in, only the assets available for that user's landing company will be returned.
 */
export interface AssetIndexRequest {
  /**
   * Must be `1`
   */
  asset_index: 1;
  /**
   * Deprecated - replaced by landing_company_short.
   */
  landing_company?: "iom" | "malta" | "maltainvest" | "svg" | "virtual" | "vanuatu";
  /**
   * [Optional] If specified, will return only the underlyings for the specified landing company.
   */
  landing_company_short?: "iom" | "malta" | "maltainvest" | "svg" | "virtual" | "vanuatu";
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * List of underlyings by their display name and symbol followed by their available contract types and duration boundaries.
 */
export type AssetIndex = unknown[];

/**
 * A message with Asset Index
 */
export interface AssetIndexResponse {
  asset_index?: AssetIndex;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "asset_index";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Update a new OAuth application
 */
export interface ApplicationUpdateRequest {
  /**
   * Application app_id.
   */
  app_update: number;
  /**
   * [Optional] Markup to be added to contract prices (as a percentage of contract payout). Max markup: 3%.
   */
  app_markup_percentage?: number;
  /**
   * [Optional] Application's App Store URL (if applicable).
   */
  appstore?: string;
  /**
   * [Optional] Application's GitHub page (for open-source projects).
   */
  github?: string;
  /**
   * [Optional] Application's Google Play URL (if applicable).
   */
  googleplay?: string;
  /**
   * [Optional] Application's homepage URL.
   */
  homepage?: string;
  /**
   * Application name.
   */
  name: string;
  /**
   * [Optional] The URL to redirect to after a successful login. Required if charging markup percentage.
   */
  redirect_uri?: string;
  /**
   * Change scopes will revoke all user's grants and log them out.
   */
  scopes: ("read" | "trade" | "trading_information" | "payments" | "admin")[];
  /**
   * [Optional] Used when `verify_email` called. If available, a URL containing the verification token will send to the client's email, otherwise only the token will be sent.
   */
  verification_uri?: string;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * A message with created application
 */
export interface ApplicationUpdateResponse {
  app_update?: AppUpdate;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "app_update";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Information of the updated application.
 */
export interface AppUpdate {
  /**
   * Active.
   */
  active?: number;
  /**
   * Application ID.
   */
  app_id?: number;
  /**
   * Markup added to contract prices (as a percentage of contract payout).
   */
  app_markup_percentage?: number;
  /**
   * Application's App Store URL.
   */
  appstore?: string;
  /**
   * Application's GitHub page (for open-source projects).
   */
  github?: string;
  /**
   * Application's Google Play URL.
   */
  googleplay?: string;
  /**
   * Application's homepage URL.
   */
  homepage?: string;
  /**
   * Application name.
   */
  name?: string;
  /**
   * The URL to redirect to after a successful login.
   */
  redirect_uri?: string;
  /**
   * Scope Details.
   */
  scopes?: string[];
  /**
   * Used when `verify_email` called. If available, a URL containing the verification token will be sent to the client's email, otherwise only the token will be sent.
   */
  verification_uri?: string;
}
/**
 * Register a new OAuth application
 */
export interface ApplicationRegisterRequest {
  /**
   * Must be `1`
   */
  app_register: 1;
  /**
   * [Optional] Markup to be added to contract prices (as a percentage of contract payout). Max markup: 3%.
   */
  app_markup_percentage?: number;
  /**
   * [Optional] Application's App Store URL (if applicable).
   */
  appstore?: string;
  /**
   * [Optional] Application's GitHub page (for open-source projects).
   */
  github?: string;
  /**
   * [Optional] Application's Google Play URL (if applicable).
   */
  googleplay?: string;
  /**
   * [Optional] Application's homepage URL.
   */
  homepage?: string;
  /**
   * Application name.
   */
  name: string;
  /**
   * [Optional] The URL to redirect to after a successful login. Required if charging markup percentage
   */
  redirect_uri?: string;
  /**
   * List of permission scopes to grant the application.
   */
  scopes: ("read" | "trade" | "trading_information" | "payments" | "admin")[];
  /**
   * [Optional] Used when `verify_email` called. If available, a URL containing the verification token will be sent to the client's email, otherwise only the token will be sent.
   */
  verification_uri?: string;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * A message with created application details
 */
export interface ApplicationRegisterResponse {
  app_register?: AppRegister;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "app_register";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * The information of the created application.
 */
export interface AppRegister {
  /**
   * Active.
   */
  active?: number;
  /**
   * Application ID.
   */
  app_id: number;
  /**
   * Markup added to contract prices (as a percentage of contract payout).
   */
  app_markup_percentage: number;
  /**
   * Application's App Store URL.
   */
  appstore: string;
  /**
   * Application's GitHub page (for open-source projects).
   */
  github: string;
  /**
   * Application's Google Play URL.
   */
  googleplay: string;
  /**
   * Application's homepage URL.
   */
  homepage: string;
  /**
   * Application name.
   */
  name: string;
  /**
   * The URL to redirect to after a successful login.
   */
  redirect_uri: string;
  /**
   * Scope Details.
   */
  scopes?: string[];
  /**
   * Used when `verify_email` called. If available, a URL containing the verification token will send to the client's email, otherwise only the token will be sent.
   */
  verification_uri: string;
}
/**
 * Retrieve statistics of `app_markup`.
 */
export interface ApplicationMarkupStatisticsRequest {
  /**
   * Must be `1`
   */
  app_markup_statistics: 1;
  /**
   * Start date (epoch or YYYY-MM-DD HH:MM:SS). Results are inclusive of this time.
   */
  date_from: string;
  /**
   * End date (epoch or YYYY-MM-DD HH::MM::SS). Results are inclusive of this time.
   */
  date_to: string;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Per application reporting of app_markup
 */
export interface ApplicationMarkupStatisticsResponse {
  app_markup_statistics?: AppMarkupStatistics;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "app_markup_statistics";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * App Markup transaction statistics
 */
export interface AppMarkupStatistics {
  /**
   * Array of summed app markups grouped by app_id
   */
  breakdown?: {
    /**
     * ID of the application where this contract was purchased.
     */
    app_id?: number;
    /**
     * The sum of markup the client paid in USD
     */
    app_markup_usd?: number;
    /**
     * The sum of markup the client paid in developer's currency
     */
    app_markup_value?: number;
    /**
     * Currency code of the app developer
     */
    dev_currcode?: string;
    /**
     * The count of app transactions
     */
    transactions_count?: number;
  }[];
  /**
   * The sum of markup the client paid in USD
   */
  total_app_markup_usd?: number;
  /**
   * The total count of transactions
   */
  total_transactions_count?: number;
}
/**
 * Retrieve details of `app_markup` according to criteria specified.
 */
export interface ApplicationMarkupDetailsRequest {
  /**
   * Must be `1`
   */
  app_markup_details: 1;
  /**
   * [Optional] Specific application `app_id` to report on.
   */
  app_id?: number;
  /**
   * [Optional] Specific client loginid to report on, like CR12345
   */
  client_loginid?: string;
  /**
   * Start date (epoch or YYYY-MM-DD HH:MM:SS). Results are inclusive of this time.
   */
  date_from: string;
  /**
   * End date (epoch or YYYY-MM-DD HH::MM::SS). Results are inclusive of this time.
   */
  date_to: string;
  /**
   * [Optional] If set to 1, will return `app_markup` transaction details.
   */
  description?: 0 | 1;
  /**
   * [Optional] Apply upper limit to count of transactions received.
   */
  limit?: number;
  /**
   * [Optional] Number of transactions to skip.
   */
  offset?: number;
  /**
   * [Optional] Sort direction on `transaction_time`. Other fields sort order is ASC.
   */
  sort?: "ASC" | "DESC";
  /**
   * [Optional] One or more of the specified fields to sort on. Default sort field is by `transaction_time`.
   *
   * @minItems 0
   * @maxItems 3
   */
  sort_fields?:
    | []
    | ["app_id" | "client_loginid" | "transaction_time"]
    | ["app_id" | "client_loginid" | "transaction_time", "app_id" | "client_loginid" | "transaction_time"]
    | [
        "app_id" | "client_loginid" | "transaction_time",
        "app_id" | "client_loginid" | "transaction_time",
        "app_id" | "client_loginid" | "transaction_time"
      ];
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Per transaction reporting of app_markup
 */
export interface ApplicationMarkupDetailsResponse {
  app_markup_details?: AppMarkupDetails;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "app_markup_details";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * App Markup transaction details
 */
export interface AppMarkupDetails {
  /**
   * Array of returned transactions
   */
  transactions?: {
    /**
     * ID of the application where this contract was purchased.
     */
    app_id?: number;
    /**
     * The markup the client paid in their currency
     */
    app_markup?: number;
    /**
     * The markup the client paid in USD
     */
    app_markup_usd?: number;
    /**
     * The markup the client paid in the app developer's currency
     */
    app_markup_value?: number;
    /**
     * Currency code of the client
     */
    client_currcode?: string;
    /**
     * Login ID of the client
     */
    client_loginid?: string;
    /**
     * Currency code of the app developer
     */
    dev_currcode?: string;
    /**
     * Login ID of the app developer
     */
    dev_loginid?: string;
    /**
     * The transaction ID. Every contract (buy or sell) and every payment has a unique ID.
     */
    transaction_id?: number;
    /**
     * The epoch value of purchase time of transaction
     */
    transaction_time?: string;
  }[];
}
/**
 * List all of the account's OAuth applications
 */
export interface ApplicationListRequest {
  /**
   * Must be `1`
   */
  app_list: 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * List of created applications for the authorized account.
 */
export type AppList = ApplicationObject[];

/**
 * A message with created applications
 */
export interface ApplicationListResponse {
  app_list?: AppList;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "app_list";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
export interface ApplicationObject {
  /**
   * Active.
   */
  active?: number;
  /**
   * Application ID.
   */
  app_id: number;
  /**
   * Markup added to contract prices (as a percentage of contract payout).
   */
  app_markup_percentage: number;
  /**
   * Application's App Store URL.
   */
  appstore: null | string;
  /**
   * Application's GitHub page. (for open-source projects)
   */
  github: null | string;
  /**
   * Application's Google Play URL.
   */
  googleplay: null | string;
  /**
   * Application's homepage URL.
   */
  homepage: null | string;
  /**
   * Application name.
   */
  name: string;
  /**
   * The URL to redirect to after a successful login.
   */
  redirect_uri: string;
  /**
   * Scope Details.
   */
  scopes?: string[];
  /**
   * Used when `verify_email` called. If available, a URL containing the verification token will send to the client's email, otherwise only the token will be sent.
   */
  verification_uri: null | string;
}
/**
 * To get the information of the OAuth application specified by 'app_id'
 */
export interface ApplicationGetDetailsRequest {
  /**
   * Application app_id
   */
  app_get: number;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * A message with requested application details
 */
export interface ApplicationGetDetailsResponse {
  app_get?: AppGet;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "app_get";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * The information of the requested application.
 */
export interface AppGet {
  /**
   * Active.
   */
  active?: number;
  /**
   * Application ID.
   */
  app_id: number;
  /**
   * Markup added to contract prices (as a percentage of contract payout).
   */
  app_markup_percentage: number;
  /**
   * Application's App Store URL.
   */
  appstore: string;
  /**
   * Application's GitHub page (for open-source projects).
   */
  github: string;
  /**
   * Application's Google Play URL.
   */
  googleplay: string;
  /**
   * Application's homepage URL.
   */
  homepage: string;
  /**
   * Application name.
   */
  name: string;
  /**
   * The URL to redirect to after a successful login.
   */
  redirect_uri: string;
  /**
   * Scope Details.
   */
  scopes?: string[];
  /**
   * Used when `verify_email` called. If available, a URL containing the verification token will send to the client's email, otherwise only the token will be sent.
   */
  verification_uri: string;
}
/**
 * The request for deleting an application.
 */
export interface ApplicationDeleteRequest {
  /**
   * Application app_id
   */
  app_delete: number;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * 1 on success
 */
export type AppDelete = number;

/**
 * The result of delete application request made.
 */
export interface ApplicationDeleteResponse {
  app_delete?: AppDelete;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "app_delete";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * This call manages API tokens
 */
export interface APITokenRequest {
  /**
   * Must be `1`
   */
  api_token: 1;
  /**
   * [Optional] The token to remove.
   */
  delete_token?: string;
  /**
   * [Optional] The name of the created token.
   */
  new_token?: string;
  /**
   * [Optional] List of permission scopes to provide with the token.
   */
  new_token_scopes?: ("read" | "trade" | "trading_information" | "payments" | "admin")[];
  /**
   * [Optional] If you set this parameter during token creation, then the token created will only work for the IP address that was used to create the token
   */
  valid_for_current_ip_only?: 0 | 1;
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * The result of the API token request made.
 */
export interface APITokenResponse {
  api_token?: ApiToken;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "api_token";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Contains the result of API token according to the type of request.
 */
export interface ApiToken {
  /**
   * Token deleted.
   */
  delete_token?: 1;
  /**
   * Token created.
   */
  new_token?: 1;
  /**
   * API tokens
   */
  tokens?: {
    /**
     * The token name specified when creating.
     */
    display_name?: string;
    /**
     * The last date which the token has been used.
     */
    last_used?: string;
    /**
     * List of permission scopes of the token.
     */
    scopes?: ("read" | "trade" | "trading_information" | "payments" | "admin")[];
    /**
     * The token that can be used to `authorize` with.
     */
    token?: string;
    /**
     * The IP restriction for the token. No restriction if empty.
     */
    valid_for_ip?: string;
  }[];
}
/**
 * Retrieve a list of all currently active symbols (underlying markets upon which contracts are available for trading).
 */
export interface ActiveSymbolsRequest {
  /**
   * If you use `brief`, only a subset of fields will be returned.
   */
  active_symbols: "brief" | "full";
  /**
   * [Optional] Category of barrier.
   */
  barrier_category?: ("american" | "asian" | "euro_atm" | "euro_non_atm" | "non_financial" | "lookback" | "reset")[];
  /**
   * [Optional] The proposed contract type
   */
  contract_type?: (
    | "MULTUP"
    | "MULTDOWN"
    | "UPORDOWN"
    | "EXPIRYRANGE"
    | "ONETOUCH"
    | "CALLE"
    | "LBHIGHLOW"
    | "ASIAND"
    | "EXPIRYRANGEE"
    | "DIGITDIFF"
    | "DIGITMATCH"
    | "DIGITOVER"
    | "PUTE"
    | "DIGITUNDER"
    | "NOTOUCH"
    | "CALL"
    | "RANGE"
    | "LBFLOATPUT"
    | "DIGITODD"
    | "PUT"
    | "ASIANU"
    | "LBFLOATCALL"
    | "EXPIRYMISSE"
    | "EXPIRYMISS"
    | "DIGITEVEN"
    | "TICKHIGH"
    | "TICKLOW"
    | "RESETCALL"
    | "RESETPUT"
    | "CALLSPREAD"
    | "PUTSPREAD"
    | "RUNHIGH"
    | "RUNLOW"
    | "ACCU"
    | "VANILLALONGCALL"
    | "VANILLALONGPUT"
    | "TURBOSLONG"
    | "TURBOSSHORT"
  )[];
  /**
   * Deprecated - replaced by landing_company_short.
   */
  landing_company?: "iom" | "malta" | "maltainvest" | "svg" | "virtual" | "vanuatu";
  /**
   * [Optional] If you specify this field, only symbols available for trading by that landing company will be returned. If you are logged in, only symbols available for trading by your landing company will be returned regardless of what you specify in this field.
   */
  landing_company_short?: "iom" | "malta" | "maltainvest" | "svg" | "virtual" | "vanuatu";
  /**
   * [Optional] If you specify this field, only symbols that can be traded through that product type will be returned.
   */
  product_type?: "basic";
  /**
   * [Optional] The login id of the user. Mandatory when multiple tokens were provided during authorize.
   */
  loginid?: string;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * List of active symbols.
 */
export type ActiveSymbols = {
  /**
   * `1` if the symbol is tradable in a forward starting contract, `0` if not.
   */
  allow_forward_starting?: 0 | 1;
  /**
   * Amount the data feed is delayed (in minutes) due to Exchange licensing requirements. Only returned on `full` active symbols call.
   */
  delay_amount?: number;
  /**
   * Display name.
   */
  display_name: string;
  /**
   * Display order.
   */
  display_order: number;
  /**
   * `1` if market is currently open, `0` if closed.
   */
  exchange_is_open: 0 | 1;
  /**
   * Exchange name (for underlyings listed on a Stock Exchange). Only returned on `full` active symbols call.
   */
  exchange_name?: string;
  /**
   * Intraday interval minutes. Only returned on `full` active symbols call.
   */
  intraday_interval_minutes?: number;
  /**
   * `1` indicates that trading is currently suspended, `0` if not.
   */
  is_trading_suspended: 0 | 1;
  /**
   * Market category (forex, indices, etc).
   */
  market: string;
  /**
   * Translated market name.
   */
  market_display_name: string;
  /**
   * Pip size (i.e. minimum fluctuation amount).
   */
  pip: number;
  /**
   * For stock indices, the underlying currency for that instrument. Only returned on `full` active symbols call.
   */
  quoted_currency_symbol?: string;
  /**
   * Latest spot price of the underlying. Only returned on `full` active symbols call.
   */
  spot?: null | number;
  /**
   * Number of seconds elapsed since the last spot price. Only returned on `full` active symbols call.
   */
  spot_age?: string;
  /**
   * Daily percentage for a symbol. Only returned on 'full' active symbols call.
   */
  spot_percentage_change?: string;
  /**
   * Latest spot epoch time. Only returned on `full` active symbols call.
   */
  spot_time?: string;
  /**
   * Subgroup name.
   */
  subgroup: string;
  /**
   * Translated subgroup name.
   */
  subgroup_display_name: string;
  /**
   * Submarket name.
   */
  submarket: string;
  /**
   * Translated submarket name.
   */
  submarket_display_name: string;
  /**
   * The symbol code for this underlying.
   */
  symbol: string;
  /**
   * Symbol type (forex, commodities, etc).
   */
  symbol_type: string;
}[];

/**
 * A message containing the list of active symbols.
 */
export interface ActiveSymbolsResponse {
  active_symbols?: ActiveSymbols;
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "active_symbols";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}
/**
 * Returns all accounts belonging to the authorized user.
 */
export interface AccountListRequest {
  /**
   * Must be `1`
   */
  account_list: 1;
  /**
   * [Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.
   */
  passthrough?: {
    [k: string]: unknown;
  };
  /**
   * [Optional] Used to map request to response.
   */
  req_id?: number;
}
/**
 * Returns all accounts belonging to the authorized user.
 */
export interface AccountListResponse {
  /**
   * List of accounts for current user. This is also available from the `authroize` call.
   */
  account_list?: {
    /**
     * Account category.
     */
    account_category: "trading" | "wallet";
    /**
     * Account type.
     */
    account_type: string;
    /**
     * 2 letter broker code.
     */
    broker?: string;
    /**
     * Creation time of the account as epoch.
     */
    created_at: number;
    /**
     * Currency of specified account.
     */
    currency: string;
    /**
     * Boolean value: 1 or 0, indicating whether the account is marked as disabled or not.
     */
    is_disabled: 1 | 0;
    /**
     * Boolean value: 1 or 0, indicating whether the account is a virtual-money account.
     */
    is_virtual: 1 | 0;
    /**
     * Landing company shortcode the account belongs to.
     */
    landing_company_name: string;
    /**
     * Details of the list of Trading accounts linked to the Wallet account.
     */
    linked_to: {
      /**
       * Account ID.
       */
      loginid?: string;
      /**
       * Account platform name.
       */
      platform?: "ctrader" | "dtrade" | "dwallet" | "dxtrade" | "mt5";
    }[];
    /**
     * The account ID of specified account.
     */
    loginid: string;
  }[];
  /**
   * Echo of the request made.
   */
  echo_req: {
    [k: string]: unknown;
  };
  /**
   * Action name of the request made.
   */
  msg_type: "account_list";
  /**
   * Optional field sent in request to map to response, present only when request contains `req_id`.
   */
  req_id?: number;
  [k: string]: unknown;
}

