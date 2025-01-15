import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import EnquiryForm from "./components/EnquiryForm";
import {Toaster} from 'react-hot-toast'

const App = () => {
    return (
        <div>
            <Toaster/>
            <EnquiryForm />
        </div>
    );
};

export default App;
