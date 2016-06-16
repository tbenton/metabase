/* @flow */
import React, { Component, PropTypes } from "react";

import { PARAMETER_SECTIONS } from "metabase/meta/Dashboard";
import type { ParameterOption } from "metabase/meta/types/Dashboard";

import _ from "underscore";

export default class ParameterTypePicker extends Component {
    props: {
        onChange: (option: ParameterOption) => {}
    };
    state: {
        section?: string
    };

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {};
    }

    render() {
        const { section } = this.state;
        const { onChange } = this.props;
        if (section == null) {
            return <ParameterOptionsSectionsPane sections={PARAMETER_SECTIONS} onSelectSection={(section) => {
                let { options } = _.findWhere(PARAMETER_SECTIONS, { id: section.id });
                if (options.length === 1) {
                    onChange(options[0]);
                } else {
                    this.setState({ section: section.id });
                }
            }} />
        } else {
            let { options } = _.findWhere(PARAMETER_SECTIONS, { id: section });
            return <ParameterOptionsPane options={options} onSelectOption={(option) => { onChange(option); } }/>
        }
    }
}

const ParameterOptionsSection = ({ section, onClick }) =>
    <li onClick={onClick} className="p1 px2 cursor-pointer brand-hover">
        <div className="text-brand text-bold">{section.name}</div>
        <div>{section.description}</div>
    </li>

const ParameterOptionsSectionsPane = ({ sections, onSelectSection }) =>
    <div className="pb2">
        <h3 className="p2">What do you want to filter?</h3>
        <ul>
            { sections.map(section =>
                <ParameterOptionsSection section={section} onClick={() => onSelectSection(section) }/>
            )}
        </ul>
    </div>

const ParameterOptionItem = ({ option, onClick }) =>
    <li onClick={onClick} className="p1 px2 cursor-pointer brand-hover">
        <div className="text-brand text-bold">{option.name}</div>
        <div>{option.description}</div>
    </li>

const ParameterOptionsPane = ({ options, onSelectOption }) =>
    <div className="pb2">
        <h3 className="p2">What kind of filter?</h3>
        <ul>
            { options.map(option =>
                <ParameterOptionItem option={option} onClick={() => onSelectOption(option)} />
            )}
        </ul>
    </div>
