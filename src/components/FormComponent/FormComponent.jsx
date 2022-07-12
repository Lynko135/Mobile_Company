import React from "react";
import mobileEvents from "../events";

class FormComponent extends React.PureComponent{

    constructor(props) {
        super(props);

        this.surnameInput = null;
        this.setSurnameInputRef = element => {
            this.surnameInput = element;
        };

        this.nameInput = null;
        this.setNameInputRef = element => {
            this.nameInput = element;
        };

        this.balanceInput = null;
        this.setBalanceInputRef = element => {
            this.balanceInput = element;
        };
    }


    

    state = {
        info: this.props.info,
    }

    cancel = () => {
        mobileEvents.emit("cancel");
    }

    save = () => {
        let editedClient = {};
        editedClient.clientSurname = this.surnameInput.value;
        editedClient.clientName = this.nameInput.value;
        editedClient.balance = this.balanceInput.value;
        (this.props.formMode==="new") ? editedClient.id = Date.now() : editedClient.id = this.state.info.id;
        mobileEvents.emit("save",editedClient);
        
    }


    render() {
        
        return(
            <div className="formContainer">
                <div className="formTitle">{this.props.formMode==="new"?"Добавить клиента":"Редактировать клиента"}</div>
                <div className="inputGroup">
                    <div>Фамилия</div>
                    <div>
                        <input
                            ref={this.setSurnameInputRef}
                            defaultValue={(this.props.formMode==="edit")?this.state.info.clientSurname:""} 
                            type="text" 
                            placeholder="Введите фамилию"/>
                    </div>
                </div>
                <div className="inputGroup">
                    <div>Имя</div>
                    <div>
                        <input
                            ref={this.setNameInputRef}
                            defaultValue={(this.props.formMode==="edit")?this.state.info.clientName:""} 
                            type="text" 
                            placeholder="Введите имя"/>
                    </div>
                </div>
                <div className="inputGroup">
                    <div>Баланс</div>
                    <div>
                        <input
                            ref={this.setBalanceInputRef}
                            defaultValue={(this.props.formMode==="edit")?this.state.info.balance:""}
                            type="text" 
                            placeholder="Введите баланс"/>
                    </div>
                </div>
                <div className="buttonGroup">
                    <button onClick={this.save} className="blueButton" style={{width:180}}>Сохранить</button>
                    <button onClick={this.cancel} className="blueButton" style={{width:180}}>Отмена</button>
                </div>
            </div>
        )
        
    }
}

export default FormComponent;