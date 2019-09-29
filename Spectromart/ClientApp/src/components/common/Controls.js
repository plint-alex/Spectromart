import React, { Fragment } from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export const renderTextField = (
    { input, label, meta: { touched, error }, ...custom },
) => (
        <TextField
            label={label}
            error={touched && !!error}
            helperText={(touched && error) || ' '}
            margin="none"
            {...input}
            {...custom}
        />
    );

export const renderUploadField = (
    { input: { onChange }, meta: { touched, error }, ...custom },
) => (
        <Fragment>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={(e) => onChange(e.target.files[0])}
            />
            <label htmlFor="raised-button-file">
                <Button component="span">
                    Upload
            </Button>
            </label>
        </Fragment>
    );

export const renderCheckbox = ({ input, label }) => (
    <FormControlLabel
        control={<Checkbox
        checked={input.value ? true : false}
        onChange={input.onChange}
        />
        }
        label={label}
    />
);

export const renderRadioGroup = ({ input, ...rest }) => (
    <RadioGroup
        {...input}
        {...rest}
        valueSelected={input.value}
        onChange={(event, value) => input.onChange(value)}
    />
);

export const renderSelectField = (
    { input, label, meta: { touched, error }, children, ...custom }) => (
        <Select
            floatingLabelText={label}
            errorText={touched && error}
            {...input}
            onChange={(event, index, value) => input.onChange(value)}
            children={children}
            {...custom}
        />
    );