import { useState } from "react";

type FieldArgs = {
    value: string
    label: string
    placeholder: string
    errorText: string
    inputType: string
    onChanged: (val: string) => void
    isValid: boolean,
    isTextArea?: boolean
    rows?: number
    columns?: number
    limit?: number
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

const Field = ({ props }: { props: FieldArgs }) => {
    const [showError, setShowError] = useState(false)

    const fieldChanged = (event: any) => {
        props.onChanged(event.target.value)
        if (props.value !== "") {
            setShowError(true)
        }
    }

    const showMessage = () => {
        if (!props.isValid && showError) {
            return true
        } else {
            return false
        }
    }

    const label = () => {
        if (props.label == "") {
            return <div className=""></div>
        } else {
            return <div className="flex space-x-4 items-center justify-between">
                <h3 className="font-bold text-md ml-4 text-gray-500">
                    {props.label}
                </h3>
                <p className="space-x-2">
                    <span className="text-red-300 font-medium text-md">{showMessage() ? props.errorText : ""}</span>
                    {props.limit == undefined ? <></> : <span className={`${props.value.length > props.limit! ? "text-txt-200 line-through" : "text-txt-400"} font-medium text-md`}>{props.value.length} / {props.limit!}</span>}
                </p>
            </div>
        }
    }

    if (props.isTextArea ?? false) {
        return <div className="space-y-1 w-full">
            {label()}
            <textarea className={`${showMessage() ? "focus:border-red-400" : "focus:border-main"} resize-none py-2 px-4 w-full bg-bg-700 rounded-md border-transparent border-2 focus:outline-none overflow-y-scroll`} onChange={fieldChanged} placeholder={props.placeholder} value={props.value} rows={props.rows ?? 8} cols={props.columns ?? 50}></textarea>
        </div>
    } else {
        return <input autoComplete="off" className={`${showMessage() ? "focus:border-red-400" : "focus:border-main"} flex-grow py-2 px-4 bg-bg-700 rounded-md border-transparent border-2 focus:outline-none`} placeholder={props.placeholder} type={props.inputType} value={props.value} onChange={fieldChanged} onKeyDown={props.onKeyDown} />
    }
}

export default Field