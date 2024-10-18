import styles from "./sign.module.css"
import { TextField, Fade } from "@mui/material"
import { useState } from "react"

export default function Sign() {
    const [idValue, setIdValue] = useState("");
    const [pwValue, setPwValue] = useState("");
    const [pwCheckValue, setPwCheckField] = useState("")

    const [showPwField,setShowPwField] = useState(false);
    const [showPWCheckField, setShowPwCheckField] = useState(false);
    const [helpText,setHelpText] = useState("6~12자 이내 들어온(굳어진)말, 수자 수용가능")
    const [pwCheckHelpText, setPwCheckHelpText] = useState(false);
    const [pwhelpText,setPwHelpText] = useState("6~12자 이내 들어온(굳어진)말, 수자 수용가능")
    const [iderror, setidError] = useState(false);
    const [pwError, setPwError] = useState(false);
    const [pwCheckError, setPwCheckError] = useState(false);
   
    

    const handleIdChange = (event) => {
        const value = event.target.value;
        setIdValue(value);

        const regexId = /^[a-zA-Z0-9]{6,12}$/;
        if (regexId.test(value)) {
            console.log("유효")
            setHelpText("사용가능")
            setidError(false)
            setShowPwField(true);
        } else {
            console.log("유효 x")
            setHelpText("유효하지 못한 ID 6~12자 이내 들어온(굳어진)말, 수자 수용가능")
            setidError(true);
            setShowPwField(false);
        }
    };
    const handlePwChange = (event) => {
        const value = event.target.value;
        setPwValue(value)
        const regexPw = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
        if (regexPw.test(value)) {
            setShowPwCheckField(true);
            setPwError(false);
            setHelpText("가능")
        } else {
            setShowPwCheckField(false);
            setPwError(true);
            setPwCheckHelpText("입당 절차 똑디해라")

        }
    }; 
        const handlePwCheckChange = (event) => {
        const value = event.target.value;
        setPwCheckField (value);
        }

    return (
        <>
        <div className={styles.wrapper}>
            <h2 className={styles.head}>입당</h2>
            <div className={styles.form}>
            <TextField 
            error = {iderror}
            id="id-required"
            label="☭동무의 입당 서명"
            placeholder="입력하라우"
            helperText={helpText}
            value={idValue}
            onChange={handleIdChange}
            fullWidth
            ></TextField>
            {showPwField && (
                <Fade in={showPwField} timeout={500}>
                    <TextField
                    error={pwHelpText}
                        id="password-required"
                        label="암구호"
                        type="password"
                        placeholder="암구호를 입력하라우"
                        helperText={pwHelpText}
                        value={pwValue}
                        onChange={handlePwChange}
                        fullWidth
                    >

                    </TextField>

                </Fade>
            )}
            {showPWCheckField && (
                <Fade in={showPWCheckField} timeout={500}>
                    <TextField
                        id="password-match"
                        label="간첩 확인"
                        type="password"
                        placeholder="다시 암구호를 입력하라우"
                        helperText="6~12자 이내 들어온(굳어진)말, 수자 수용가능"
                        value={pwCheckValue}
                        onChange={handlePwCheckChange}
                        fullWidth
                    >

                    </TextField>

                </Fade>
            )}
            </div>
        </div>
        </>
    )
}