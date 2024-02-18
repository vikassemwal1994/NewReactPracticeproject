import React, { useEffect, useRef, useState } from "react"

const CheckoutStepper = ({ stepsConfig = [] }) => {

    const [currentStep, setCurrentStep] = useState(1)
    const [isComplete, setIsComplete] = useState(false)
    const [margins, setMargins] = useState({
        marginLeft: 0,
        marginRight: 0,
    })
    const stepRef = useRef([])

    useEffect(() => {
        setMargins({
            marginLeft: stepRef.current[0].offSetWidth / 2,
            marginRight: stepRef.current[stepsConfig.length - 1].offSetWidth
        })
        console.log(stepRef.current[stepsConfig.length - 1].offSetWidth)
    }, [stepRef, stepsConfig.length])

    if (!stepsConfig) {
        return <></>
    }

    const handleNext = () => {
        setCurrentStep(prev => {
            if (prev == stepsConfig.length) {
                setIsComplete(true)
                return prev
            } else {
                return prev + 1
            }
        })
    }

    const calculateProgressBarWidth = () => {

        console.log("width: ", (currentStep - 1) / (stepsConfig.length - 1) * 100)
        return ((currentStep - 1) / (stepsConfig.length - 1)) * 100;
    }


    return (
        <>
            <div className="stepper">
                {stepsConfig.map((step, index) => {
                    return (
                        <div
                            key={step.name}
                            ref={el => (stepRef.current[index] = el)}
                            className={`step 
                            ${currentStep > index + 1 || isComplete ? "complete" : ""}
                            ${currentStep == index + 1 ? "active" : ""}`}
                        >
                            <div className="step-number">{currentStep > index + 1 || isComplete ? <span>&#10003;</span> : (index + 1)}</div>
                            <div className="step-name">{step.name}</div>
                        </div>
                    )
                })}

                <div className="progress-bar"
                    style={{
                        width: `calc(100%-${margins.marginLeft + margins.marginRight}px)`,
                        marginLeft: margins.marginLeft,
                        marginRight: margins.marginRight,
                    }}
                >
                    <div className="pogress"
                        style={{ width: `${calculateProgressBarWidth()}%` }}
                    ></div>
                </div>
            </div>

            {!isComplete && (
                <button className="btn" onClick={handleNext}>{currentStep == stepsConfig.length ? "Finish" : "Next"}</button>
            )}
        </>
    )
};

export default CheckoutStepper;
