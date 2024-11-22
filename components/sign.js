import styles from "./sign.module.css"
import { TextField, Fade, Button } from "@mui/material"
import { useState } from "react"

export default function Sign() {
    const [idValue, setIdValue] = useState("");
    const [pwValue, setPwValue] = useState("");
    const [userNameValue, setUserNameValue] = useState("");
    const [pwCheckValue, setPwCheckValue] = useState("")
    const [showPwField, setShowPwField] = useState(false);
    const [showPWCheckField, setShowPwCheckField] = useState(false);

    const [helpText, setHelpText] = useState("6~12자 이내 들어온(굳어진)말, 수자 수용가능")
    const [pwCheckHelpText, setPwCheckHelpText] = useState(false);
    const [pwHelpText, setPwHelpText] = useState("6~12자 이내 들어온(굳어진)말, 수자 수용가능")

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
            setHelpText("가능");
        } else {
            setShowPwCheckField(false);
            setPwError(true);
            setPwCheckHelpText("입당 절차 똑디해라");

        }
    };

    const handlePwCheckChange = (event) => {
        // 목표 : PwTextField에 있는 값을 가져와서 똑같은지 검사
        const value = event.target.value;
        setPwCheckValue(value);

        if (pwValue == value) {
            setPwCheckError(false)
            setPwCheckHelpText("비밀번호가 일치합니다.")
        } else {
            setPwCheckError(true)
            setPwCheckHelpText("비밀번호가 일치하지 않습니다.")
        }
    };

    const handleUserNameChange = (event) => {
        const value = event.target.value
        if (value.length >= 0) {
            setUserNameValue(value);
        }
    }
    const handleSubmit = async () => {
        try {
            const response = await fetch("/api/register", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify({
                    username: userNameValue,
                    userId : idValue,
                    password : pwValue,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                alert("ok");
            } else {
                alert("fuck");
            }
        } catch (error) {
            console.error("fuck",error);
        }
    }
    return (
        <>
            <div className={styles.wrapper}>
                <h2 className={styles.head}>입당</h2>
                <div className={styles.form}>
                    <TextField
                        id="username-required"
                        label="Username"
                        placeholder="닉네임"
                        helperText="사용하실 닉네임을 입력해주세요"
                        value={userNameValue}
                        onChange={handleUserNameChange}
                        fullWidth
                    ></TextField>
                    <TextField
                        error={iderror}
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
                                error={pwError}
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
                    <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={handleSubmit}
                        style={{ marginTop: '20px' }}
                    >Continue</Button>
                </div>
            </div>
        </>
    )
}