import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import Fuse from 'fuse.js'
import { accessApiGet } from "../../utils/AccessApiUtils";
import { domain, api_path } from '../../config/route';
import "./StockSearch.css"
import SelectSearch from 'react-select-search'

const StockSearch = () => {
    const secretKey = "0123456789ASDFGH";
    const IV = CryptoJS.enc.Utf8.parse("1122334455");
    const navigate = useNavigate();

    const [value, setValue] = useState();
    const [options, setOptions] = useState([]);

    const getCompanyList = async (type) => {
        const req_url = domain + api_path.stock.get_all_company_list;
        const req_data = {
            'type': type
        }

        accessApiGet(req_url, req_data, '無法取得公司列表')
            .then((response) => {
                if (response.metadata.status === 'success') {
                    const result = response.data.map((element) => {
                        let value = {
                            stock_name: element['Name'],
                            stock_id: element['ID'],
                            stock_type: type == '1' ? '上市' : '上櫃',
                        };

                        return {
                            name: element['Name'],
                            value: CryptoJS.AES.encrypt(
                                JSON.stringify(value),
                                CryptoJS.enc.Utf8.parse(secretKey),
                                { iv: IV, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding }
                            ).ciphertext.toString(CryptoJS.enc.Hex)
                        };
                    });

                    setOptions(prevState => prevState.concat(result));
                }
            })
    }

    useEffect(() => {
        getCompanyList('1');
        getCompanyList('2');
    }, [])

    return (
        <div className='stock-search py-2'>
            <a className='' href='/'>
                首頁
            </a>
            <SelectSearch
                options={options}
                value={value}
                onChange={(e) => {
                    navigate('/stock?id=' + e);
                }}
                search
                emptyMessage="Not found"
                placeholder="2330"
                filterOptions={(options) => {
                    const fuse = new Fuse(options, {
                        keys: ["name", "value"],
                        threshold: 0.3
                    });

                    return (value) => {
                        if (!value.length) {
                            return options;
                        }

                        return fuse.search(value).map((result) => result.item);
                    };
                }} />
        </div>

    );
}
export default StockSearch
