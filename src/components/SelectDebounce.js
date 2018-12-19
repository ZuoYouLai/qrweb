import React, {PropTypes} from "react";
import { Select, Form} from 'antd'
import _debounce from 'lodash.debounce'
import {getString} from "../utils/helper";
const { Option } = Select
function debounce (wait) {
    return function debounceDecorator (target, key, descriptor) {
        descriptor.value = _debounce(descriptor.value, wait)
        return descriptor
    }
}

class SearchSelect extends React.Component {

    source
    state = {
        value: null,
        loading: false,
    };

    constructor (props) {
        super(props)
        this.onSearch = this.onSearch.bind(this)
        this.state.value = props.value ? [props.value] : [];

    }

    componentWillReceiveProps (nextProps) {
        if ('value' in nextProps) {
            const value = nextProps.value ? [nextProps.value] : []
            this.setState({ value })
        }
    }

    @debounce(600)
    async onSearch (q) {
        if (this.source) this.source.cancel()
        // const source = this.source = CancelToken.source()
        let isCanceled
        this.setState({ loading: true })
        try {
            this.props.onSearchDevice(q.trim());

        } catch (err) {

        } finally {
            this.setState({ loading: false })
        }
    }

    onChange = value => {
        const { onChange } = this.props
        if (typeof onChange === 'function') onChange(value)
    }

    renderOptions () {
        const {devices} = this.props;

        if(devices){
            return devices.map((device,i) => (
                <Option value={`${device.id}`} key={`deviceItem_${i}`}>{device.id}</Option>
            ))
        }
    }

    render () {
        const {  size,onSelect,block ,renderOption, clearSearchId,reset,disabled} = this.props
        const { getFieldDecorator,resetFields } = this.props.form;


        return (
            <Select
                disabled={disabled}
                showSearch
                filterOption={false}
                defaultActiveFirstOption={false}
                size={size}
                placeholder={getString('countOperation_devices_select')}
                notFoundContent= {getString('countOperation_notFoundContent')}
                onSearch={this.onSearch}
                onChange={this.onChange}
                onSelect={onSelect}
                style={{width:block ? '100%' : 150,display:block ? 'block':'inline-block' }}
                allowClear
            >
                {renderOption ? renderOption : this.renderOptions()}
            </Select>
        )
    }
}

export default Form.create()(SearchSelect)