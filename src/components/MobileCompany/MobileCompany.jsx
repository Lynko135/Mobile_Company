import React from "react";
import PropTypes from 'prop-types';
import MobileClient from "../MobileClient/MobileClient";
import FormComponent from "../FormComponent/FormComponent";
import mobileEvents from "../events";

class MobileCompany extends React.PureComponent{
    static propTypes = {
        clients:PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            clientSurname: PropTypes.string.isRequired,
            clientName: PropTypes.string.isRequired,
            balance: PropTypes.number.isRequired,
          })
        ),
      };

    state = {
        clients: this.props.clients,
        status: "all", /*all active blocked*/
        formMode: null, /* edit new*/
        info: null
    }

    componentDidMount = () => {
        mobileEvents.addListener("createEditForm", this.createEdit)
        mobileEvents.addListener("deleteClient", this.deleteClient)
        mobileEvents.addListener("cancel", this.cancel)
        mobileEvents.addListener("save", this.save)
    }
    componentWillUnmount = () => {
        mobileEvents.removeListener("createEditForm", this.createEdit)
        mobileEvents.removeListener("deleteClient", this.deleteClient)
        mobileEvents.removeListener("cancel", this.cancel)
        mobileEvents.removeListener("save", this.save)
        
    }



    createTable = () => {
        if(this.state.status === "all") {
            return this.state.clients.map(client => <MobileClient key={client.id} client={client} formMode={this.state.formMode}/>)
        }
        else if(this.state.status === "active") {
            return this.state.clients.map(client => (client.balance>=0) ? <MobileClient key={client.id} client={client} formMode={this.state.formMode}/> : null)
        }
        else if(this.state.status === "blocked") {
            return this.state.clients.map(client => (client.balance<0) ? <MobileClient key={client.id} client={client} formMode={this.state.formMode}/> : null)
        }
    }

    getAll = () => {
        this.setState({status: "all"});
    }
    getActive = () => {
        this.setState({status: "active"});
    }
    getBlocked = () => {
        this.setState({status: "blocked"});
    }
    createEdit = (code) => {
        this.setState({
            formMode: "edit",
            info: [...this.state.clients].find((client) => client.id === code)
        });
        
    }
    createNew = () => {
        this.setState({formMode: "new"});
    }

    deleteClient = (code) => {
        this.setState({
            clients: [...this.state.clients].filter((client) => code !== client.id)
        })
    }
    cancel = () => {
        this.setState({
            info: null,
            formMode: null
        })
    }
    save = (newClient) => {
        if(this.state.formMode === "new") {
            this.setState({
                formMode: null,
                clients: [...this.state.clients, newClient]
            })
        }
        else if(this.state.formMode === "edit") {
            this.setState({
                formMode: null,
                info: null,
                clients: [...this.state.clients].map((elem) => (elem.id===newClient.id) ? elem=newClient : elem)
            })
        }
        console.log(newClient)
    }

    render() {
        console.log("MobileCompany render");

        return(


            <div className="flexParent">
                <div>
                    <div className="buttonsGroup">
                        <button disabled={this.state.formMode || !this.state.clients.length} onClick={this.getAll} className={this.state.status === "all" ? "button9 buttonChosenBlue" : "button9"}>Все</button>
                        <button disabled={this.state.formMode || !this.state.clients.length} onClick={this.getActive} className={this.state.status === "active" ? "button9 buttonChosenGreen" : "button9"}>Активные</button>
                        <button disabled={this.state.formMode || !this.state.clients.length} onClick={this.getBlocked} className={this.state.status === "blocked" ? "button9 buttonChosenRed" : "button9"}>Заблокированные</button>
                        <button disabled={this.state.formMode} className="button9" onClick={this.createNew}>Добавить клиента</button>
                    </div>
                    {(this.state.clients.length)? 
                        (<table>
                            <thead>
                                <tr>
                                    <th>Фамилия</th>
                                    <th>Имя</th>
                                    <th>Баланс</th>
                                    <th>Статус</th>
                                    <th>Редактировать</th>
                                    <th>Удалить</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.createTable()}
                            </tbody>
                        </table>)
                        :<h1 className="noClients">В списке клиентов нет</h1>
                    }
                    
                    
                </div>
                {(this.state.formMode==="edit" || this.state.formMode==="new")
                ?<FormComponent
                    formMode={this.state.formMode}
                    info={this.state.info}
                />:null}
            </div>
        );
    }
};

export default MobileCompany;