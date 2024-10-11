import styles from "./sign.module.css"
import { TextField, Fade } from "@mui/material"
import { useState } from "react"

export default function Sign() {
    const [idValue, setIdValue] = useState("");
    const [showPwField,setShowPwField] = useState(false);
    const handleIdChange = (event) => {
        const value = event.target.value;
        setIdValue(value);
        

        if (value.length >= 6) {
            console.log(value);
            setShowPwField(true);
        } else {
            setShowPwField(false);
        }
    }
    return (
        <>
        <div className={styles.wrapper}>
            <h2 className={styles.head}>입당</h2>
            <div className={styles.form}>
            <TextField 
            id="id-required"
            label="☭동무의 입당 서명"
            placeholder="입력하라우"
            helperText="6~12자 이내 들어온(굳어진)말, 수자 수용가능"
            value={idValue}
            onChange={handleIdChange}
            ></TextField>
            {showPwField && (
                <Fade in={showPwField} timeout={500}>
                    <TextField
                        id="password-required"
                        label="암구호"
                        type="password"
                        placeholder="암구호를 입력하라우"
                        helperText="6~12자 이내 들어온(굳어진)말, 수자 수용가능"
                    >

                    </TextField>

                </Fade>
            )}
            </div>
        </div>
        </>
    )
}