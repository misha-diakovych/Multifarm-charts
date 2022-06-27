import React from 'react';
import './Asset.scss'

interface Props {
    item: any,
    selectAsset: any
}
const Asset = (props: Props) => {
    const handleClickAsset = (item: any): any => {
        props.selectAsset(item)
    }
    return (
        <p onClick={() => handleClickAsset(props.item.assetId)} className="assets-text">{ props.item.asset }</p>
    );
};

export default Asset;
