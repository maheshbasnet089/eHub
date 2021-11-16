import React, { useState } from 'react';
import Card from '../../../components/shared/Card/Card';
import TextInput from '../../../components/shared/TextInput/TextInput';
import Button from '../../../components/shared/Button/Button';
import styles from './StepName.module.css'
import { useDispatch,useSelector } from 'react-redux';
import { setName } from '../../../store/activateSlice';

const StepName = ({ onNext }) => {
    const dispatch = useDispatch()
    const [fullname,setFullname] = useState(useSelector(state => state.activateSlice.name))
    function submit(){
        if(!fullname){
            return
        }
        dispatch(setName(fullname))
        onNext()
    }

    return (
        <>
    <Card title="What is your Name?" icon="goggle-emoji">
        <TextInput value={fullname} onChange={(e)=>{setFullname(e.target.value)}} />
        <div>
        <p className={styles.paragraph}>
                    Please enter your real name to enter eHub :-)
         </p>
        <div className={styles.actionButtonWrap}>
            <Button text="Next" onClick={submit} />

            </div>
        </div>

     </Card>
        </>
    );
};

export default StepName;