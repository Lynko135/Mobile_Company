import React from "react";
import mobileEvents from "../events";


class MobileClient extends React.PureComponent{
    
    state = {
        client: this.props.client
    }

    editClient = () => {
        mobileEvents.emit("createEditForm", this.props.client.id);
    }

    deleteClient = () => {
        mobileEvents.emit("deleteClient", this.props.client.id)
    }

    render() {

        console.log("MobileClient id="+this.state.client.id+" render");

        return(
            <tr>
                <td>{this.props.client.clientSurname}</td>
                <td>{this.props.client.clientName}</td>
                <td>{this.props.client.balance}</td>
                {(this.props.client.balance>=0)
                    ?<td style={{background:"linear-gradient(0deg, rgb(48 251 0) 0%, rgb(221 255 212) 100%)"}}>Активен</td>
                    :<td style={{background:"linear-gradient(0deg, rgb(249 0 0) 0%, rgb(255 161 161) 100%)"}}>Заблокирован</td>
                }
                <td>
                    <button onClick={this.editClient} className="blueButton" disabled={this.props.formMode}>Редактировать</button>
                </td>
                <td>
                    <button onClick={this.deleteClient} className="blueButton" disabled={this.props.formMode}>Удалить</button>
                </td>
            </tr>
        )
    }
};

export default MobileClient;