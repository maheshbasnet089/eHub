import React,{useState} from 'react'
import Card from '../../../../components/shared/Card/Card'
import Button from '../../../../components/shared/Button/Button'
import TextInput from '../../../../components/shared/TextInput/TextInput'
import styles from '../StepPhoneEmail.module.css'

const Email = ({onNext}) => {
    const [Email,setEmail] = useState('')

    return (
    <Card title="Enter your Email " icon="email-emoji">
        <TextInput value={Email} onChange={(e)=>{setEmail(e.target.value)}} />

        <div>
        <div className={styles.actionButtonWrap}>
            <Button text="Next" onClick={onNext}/>

            </div>
        </div>
        <p className={styles.bottomParagraph}>
                    By entering your number, you’re agreeing to our Terms of
                    Service and Privacy Policy. Thanks!
         </p>
    </Card>
    )
}

export default Email
