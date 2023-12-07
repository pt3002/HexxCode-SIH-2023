import { Button, TextField, Typography } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
// import dayjs from "dayjs";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// // import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { useState } from "react";
import { Theme, useTheme } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select, { SelectChangeEvent } from "@material-ui/core/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: "500px",
		},
	},
};

const names = ["COEP Tech", "VPKBIT Baramati", "VPKBIT Nashik"];

function getStyles(name, personName, theme) {
	return {
		fontWeight:
			personName.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

export const renderText = ({ label, color, align, variant, component }) => (
	<Typography
		color={color ? color : "primary"}
		align={align ? align : "center"}
		variant={variant ? variant : "h6"}
	>
		{label}
	</Typography>
);
export const renderText1 = ({ label, color, align, variant, component }) => (
	<Typography
		color={color ? color : "black"}
		align={align ? align : "center"}
		variant={variant ? variant : "h8"}
	>
		{label}
	</Typography>
);

export const renderInputText = ({
	label,
	name,
	color,
	stateVar,
	handleOnChange,
	personalData
}) => {
	const { data, errors } = stateVar;
	if(personalData && "applicationFilled" in personalData && personalData.applicationFilled==true && personalData.modifications.includes(name) == false){
		return (
			<TextField
				label={label}
				color={color ? color : "primary"}
				variant="outlined"
				name={name}
				fullWidth={true}
				size="small"
				value={data[name]}
				error={name !== "phyDis" ? (errors[name] ? true : false) : false}
				helperText={name !== "phyDis" ? errors[name] : ""}
				onChange={handleOnChange}
				disabled
			/>
		);
	}
	return (
		<TextField
			label={label}
			color={color ? color : "primary"}
			variant="outlined"
			name={name}
			fullWidth={true}
			size="small"
			value={data[name]}
			error={name !== "phyDis" ? (errors[name] ? true : false) : false}
			helperText={name !== "phyDis" ? errors[name] : ""}
			onChange={handleOnChange}
		/>
	);
};

export const renderInputTextDisabled = ({
	label,
	name,
}) => {
	return (
		<TextField
			label={label}
			disabled
			variant="outlined"
			name={name}
			fullWidth={true}
			size="small"
		/>
	);
};

export const renderInputSelect = ({
	label,
	name,
	color,
	stateVar,
	handleOnChange,
	arr,
	personalData
}) => {
	if(stateVar && "data" in stateVar && "errors" in stateVar){
		const { data, errors } = stateVar;
		if(personalData && "applicationFilled" in personalData && personalData.applicationFilled==true && personalData.modifications.includes(name) == false){
			return (
				<TextField
					label={label}
					select
					color={color ? color : "primary"}
					variant="outlined"
					name={name}
					fullWidth={true}
					size="small"
					value={data[name]}
					error={errors[name] ? true : false}
					helperText={errors[name]}
					onChange={handleOnChange}
					disabled
				>
					{arr.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
			);
		}
		return (
			<TextField
				label={label}
				select
				color={color ? color : "primary"}
				variant="outlined"
				name={name}
				fullWidth={true}
				size="small"
				value={data[name]}
				error={errors[name] ? true : false}
				helperText={errors[name]}
				onChange={handleOnChange}
			>
				{arr.map((option) => (
					<MenuItem key={option.value} value={option.value}>
						{option.label}
					</MenuItem>
				))}
			</TextField>
		);
	}
	
};
export const renderMultiInputText = ({
	label,
	name,
	color,
	stateVar,
	handleOnChange,
	personalData
}) => {
	if(stateVar && "data" in stateVar && "errors" in stateVar){
		const { data, errors } = stateVar;
		if(personalData && "applicationFilled" in personalData && personalData.applicationFilled==true && personalData.modifications.includes(name) == false){
			return (
				<TextField
					label={label}
					multiline
					color={color ? color : "primary"}
					variant="outlined"
					name={name}
					fullWidth={true}
					size="small"
					value={data[name]}
					error={errors[name] ? true : false}
					helperText={errors[name]}
					onChange={handleOnChange}
					disabled
				/>
			)
		}
		return (
			<TextField
				label={label}
				multiline
				color={color ? color : "primary"}
				variant="outlined"
				name={name}
				fullWidth={true}
				size="small"
				value={data[name]}
				error={errors[name] ? true : false}
				helperText={errors[name]}
				onChange={handleOnChange}
			/>
		);
	}
	
};

export const renderButton = ({ label, variant, color, handleOnClick }) => (
	<Button
		variant={variant ? variant : "outlined"}
		color={color ? color : "primary"}
		size="small"
		style={{ marginTop: "5px" }}
		onClick={handleOnClick}
	>
		{label}
	</Button>
);

// export const renderDate = ({ label, name, state, handleOnChangeDate }) => {
// 	const { data, errors } = state;
// 	const yesterday = dayjs().subtract(1, "day");
// 	return (
// 		<DatePicker
// 			defaultValue={yesterday}
// 			disableFuture
// 			label={label}
// 			// views={['year', 'month', 'day']}
// 			name={name}
// 			value={data[name]}
// 			// date={data[name].$d}
// 			onChange={(value) => handleOnChangeDate({ name }, value)}
// 			// onChange={(value)=>console.log({value})}
// 		/>
// 	);
// };

export const MultipleSelect = ({ state, name1, handleChangePreferences }) => {
	const theme = useTheme();
	const [personName, setPersonName] = useState([]);
	const { data, errors } = state;
	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		setPersonName(
			// On autofill we get a stringified value.
			typeof value === "string" ? value.split(",") : value
		);
	};

	return (
		<div>
			<FormControl sx={{ m: 1, width: "500px" }}>
				<Select
					labelId="demo-multiple-name-label"
					id="demo-multiple-name"
					multiple
					error={errors[name1] ? true : false}
					helperText={errors[name1]}
					name1="campusPreferences"
					value={personName}
					onChange={(value) => {
						handleChange(value);
						handleChangePreferences(value);
					}}
					input={<OutlinedInput label="Name" />}
					MenuProps={MenuProps}
					style={{ minWidth: "300px" }}
				>
					{names.map((name) => (
						<MenuItem
							key={name}
							value={name}
							style={getStyles(name, personName, theme)}
						>
							{name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
};
