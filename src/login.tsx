import { toast } from 'react-toastify';
import picture from './assets/piKOne.png';
import './login.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [code, setCode] = useState("");
    const [adminCode, setAdminCode] = useState("");
    const [role, setRole] = useState("admin");
    const navigate = useNavigate();

    useEffect(() => {
        if (role === "admin") {
            axios.get("/api/admin/code")
                .then(response => {
                    setAdminCode(response.data.code);
                })
                .catch(error => {
                    toast.error("Erreur lors de la récupération du code admin");
                    console.log(error);
                    
                });
        }
    }, [role]);

    const handleInputChange = (e:any) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setCode(value);
            if (value.length === 4) {
                handleLogin(value);
            }
        } else {
            toast.error("Seuls les chiffres de 0 à 9 sont autorisés !");
        }
    };

    const handleLogin = (inputCode:string) => {
        if (role === "admin" && inputCode === adminCode) {
            navigate("/homeAdmin");
        } else if (role === "caissier") {
            axios.post("/api/caissier/auth", { code: inputCode })
                .then(response => {
                    if (response.data.success) {
                        navigate("/homeCaissier");
                    } else {
                        toast.error("Échec de l'authentification");
                    }
                })
                .catch(error => {
                    toast.error("Erreur lors de la vérification du code");
                    console.log(error);
                    
                });
        } else {
            toast.error("Échec de l'authentification");
        }
    };

    return (
        <div className="login-container">
            <div className="left-section">
                <img src={picture} alt="Phone Interface" className="phone-image" />
            </div>

            <div className="right-section">
                <div className="role-selection">
                    <input type="radio" name="role" id="admin" className="radio-admin" defaultChecked onChange={() => setRole("admin")} />
                    <label htmlFor="admin" className="label-admin">Admin</label>
                </div>
                <div className="role-selection">
                    <input type="radio" name="role" id="caissier" className="radio-caissier" onChange={() => setRole("caissier")} />
                    <label htmlFor="caissier" className="label-caissier">Caissier</label>
                </div>

                <div className="code-input">
                    <label className="code-label">Entrer le code</label>
                    <input 
                        type="password"
                        className="password-field"
                        maxLength={4}
                        placeholder='* * * *'
                        inputMode="numeric"
                        value={code}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="bottom-bar"></div>
        </div>
    );
};

export default Login;
