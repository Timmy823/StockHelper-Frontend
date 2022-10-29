export const domain = process.env.REACT_APP_STOCK_DOMAIN;
export const api_path = {
    'stock': {
        'get_all_company_list': '/twse/getAllCompanyList',
        'get_recent_half_year_stock_info': '/twse/getStockTradeInfo',
        'get_dividend_info': '/twse/getCompanyDividendPolicy',
        'get_company_profile': '/twse/getCompanyProfile',
        'get_eps_info': '/twse/getStockEps',
        'get_revenue_info': '/twse/getCompanyMonthlyRevenue',
    },
    'member': {
        'get_member_info':'/member/getMemberInfo',
        'create_member':'/member/createMember',
        'update_member':'/member/updateMember',
        'send_certification': '/member/sendEmailCertification',
    },
    'list': {
        'get_favorite_list': '/favorite_list/getFavoriteList',
        'add_favorite_list': '/favorite_list/addFavoriteListName',
        'rename_favorite_list': '/favorite_list/updateFavoriteListName',
        'delete_favorite_list': '/favorite_list/deleteFavoriteListName',
        'add_favorite_list_stock': '/favorite_list/addFavoriteListStock',
        'delete_favorite_list_stock': '/favorite_list/deleteFavoriteListStock',
    }
};
