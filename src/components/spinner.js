import { Spin } from 'antd';

const Spinner = ({ tip, minHeight }) => {
    // default values for spinner
    const _tip = tip || 'Yükleniyor... Lütfen Bekleyiniz!';
    const _minHeight = minHeight || '300px';

    return (
        <Spin tip={_tip}>
            <div style={{ minHeight: _minHeight }}></div>{' '}
        </Spin>
    );
};

export default Spinner;
