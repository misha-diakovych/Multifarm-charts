import React, {useEffect, useState} from 'react';
import './App.scss';
import Chart from "./components/Chart/chart";
import axios from "axios";
import Asset from "./components/Asset/Asset";
import { Row, Col } from 'react-bootstrap'

const API_URL: string = 'https://api.multifarm.fi/jay_flamingo_random_6ix_vegas/'

const App = () => {
    const [assetsList, setAssetsList] = useState<unknown[]>([])
    const [selectedAsset, setSelectedAsset] = useState<string>('ETH_Curve__DAI-USDC-USDT')
    const [selectedAssetData, setSelectedAssetData] = useState<object>({})

    useEffect( () => {
        fetchData().catch(err => console.log("All Data ERROR", err))
        fetchAssetById().catch(err => console.log("Data by ID ERROR", err))
    }, [])

    useEffect(() => {
        fetchAssetById().catch(err => console.log("Data by ID ERROR", err))
    }, [selectedAsset])

    const fetchData = async (): Promise<void> => {
        const { data } = await axios.get(API_URL + 'get_assets?pg=1&tvl_min=50000&sort=tvlStaked&sort_order=desc&farms_tvl_staked_gte=10000000')
        if(data.data) {
            setAssetsList(data.data)
        }
        return data
    }

    const fetchAssetById = async (): Promise<void> => {
        const { data } = await axios.get(`${API_URL}get_asset_details/${selectedAsset}`)
        if(data) {
            setSelectedAssetData(data)
        }
    }

    const handleSelectAsset = (asset: string) => {
        setSelectedAsset(asset)
    }
    return (
    <div className="App">
        <Row className="d-flex">
            <Col className="col-6">
                <Chart data={selectedAssetData} field={'aprHistory'} titleText={'Asset APR (y)'} />
            </Col>
            <Col className="col-6">
                <Chart data={selectedAssetData} field={'tvlStakedHistory'} titleText={'Asset TVL'} />
            </Col>
        </Row>
        {
            assetsList.map((el: any) => (<Asset selectAsset={handleSelectAsset} key={el.assetId} item={el}/>))
        }
    </div>
  );
}

export default App;
