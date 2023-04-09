import HandIcon from './HandIcon';
import './ResultIcon.css';

function ResultIcon({ value, score, otherScore}) {
    let isWinner = 'Hand';
    if (score > otherScore) {
        isWinner = 'Hand-winner';
    } else if( score <= otherScore){
        isWinner = 'Hand'
    }
    

    return (
        <div className={isWinner}>
            <HandIcon className='Hand-icon'value={value} />
        </div>
    )

}

export default ResultIcon