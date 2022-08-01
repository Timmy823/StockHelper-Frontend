import React, {Component} from "react"
import Bottombar from "../Tabbar/Bottombar";
import StockSearch from "../Search/StockSearch";

class Main extends Component {
    render() {
        return (
            <div>
                <StockSearch/>
                <Bottombar/>
            </div>
        )
    }
}
export default Main
