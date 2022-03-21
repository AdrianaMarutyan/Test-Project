import * as React from 'react';
import '../assets/styles/App.css'
import {  Window } from '@progress/kendo-react-dialogs';
import {useForm} from "react-hook-form";
import axios from "axios";

const CreateUserDialog = () => {
    const [visibleWindow, setVisibleWindow] = React.useState(false);
    const { register, handleSubmit } = useForm();

    const onClick = (data) => {
        axios.post(`https://6235e374163bf7c4745f87db.mockapi.io/Users`, data)
            .then(() =>  {
                setVisibleWindow(!visibleWindow);}
            ).catch()
    }

    const onSubmit = data => onClick(data);

    const toggleWindow = () => {
        setVisibleWindow(!visibleWindow);
    };

    return <div>
         <span>
          <button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onClick={toggleWindow}>Open Window</button>
        </span>

        {visibleWindow && <Window title={"Status"} onClose={toggleWindow}>
            <form className="new-user-add" onSubmit={handleSubmit(onSubmit)}>
                <input placeholder="please write username..." {...register("name")} className="Input_field" required={true}  maxLength={15}/>
                <input type="submit" className="button_submit"   value="create new user"/>
            </form>
        </Window>}
    </div>;
};

export default CreateUserDialog;