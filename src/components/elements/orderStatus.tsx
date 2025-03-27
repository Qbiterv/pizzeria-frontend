import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {StatusResponse} from "../../utils/status.tsx";


function OrderStatus({orderId, finalized}: {orderId: number, finalized: boolean}) {
    const [steps, setSteps] = useState<[]>([]);
    const [step, setStep] = useState<number>(0);

    useEffect(() => {
        axios.get("/api/status").then((res) => {
            setSteps(res.data);
            console.log(res.data);
            console.log(steps);
        }).catch((error) => {
            console.error("Error message:", error.message);
        })
    }, [orderId]);

    useEffect(() => {
        function getStep() {
            axios.get("/api/status/" + orderId).then((res: AxiosResponse<StatusResponse>) => {
                const dataStep: number = res.data.message;

                return setStep(dataStep);
            }).catch((error) => {
                console.error("Error message:", error.message);
            })
        }

        if(finalized || step == -1) {
            return setStep(-1);
        }

        const interval = setInterval(() => {
            getStep();
        }, 15000);

        return () => {
            clearInterval(interval)
        }
    }, []);

    return (
        <Box className={"transform transition duration-300"} sx={{ width: '100%' }}>
            <Stepper className={"transform transition duration-300 flex justify-center"} activeStep={step+1} alternativeLabel>
                {step == -1 ? (
                    <p className={"text-3xl font-bold text-red-500"}>ZAMÓWIENIE ANULOWANE</p>
                ) : (
                    steps.map((label) => (
                        <Step className={"transform transition duration-300"} key={label}>
                            <StepLabel className={"transform transition duration-300"}>{label}</StepLabel>
                        </Step>
                    ))
                )}
            </Stepper>
        </Box>
    );
}

export default OrderStatus;