import React, {Component} from "react"
import BottomNavigation from "reactjs-bottom-navigation"
import "./Bottombar.css"
import HomeOnClickPNG from '../../image/bottombar/home_onclick.png';
import HomeNoClickPNG from '../../image/bottombar/home_noclick.png';
import FavoriteOnClickPNG from '../../image/bottombar/favorite_onclick.png';
import FavoriteNoClickPNG from '../../image/bottombar/favorite_noclick.png';
import AccountOnClickPNG from '../../image/bottombar/account_onclick.png';
import AccountNoClickPNG from '../../image/bottombar/account_noclick.png';

const bottomNavItems = [
    {
        title:'首頁',
        icon: <img src={HomeNoClickPNG} alt="Home" />,
        activeIcon: <img src={HomeOnClickPNG} alt="Home" />
    },
    {
        title:'我的最愛',
        icon: <img src={FavoriteNoClickPNG} alt="Favorite" />,
        activeIcon: <img src={FavoriteOnClickPNG} alt="Favorite" />
    },
    {
        title:'帳戶資訊',
        icon: <img src={AccountNoClickPNG} alt="Account" />,
        activeIcon: <img src={AccountOnClickPNG} alt="Account" />
    }
]

class Bottombar extends Component {
    render() {
        return (
            <div>
                <BottomNavigation
                    items={bottomNavItems}
                    defaultSelected={0}
                    onItemClick={(item) => console.log(item)}
                />
            </div>
        )
    }
}
export default Bottombar;
