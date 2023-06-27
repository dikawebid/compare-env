import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
	const [name1, setName1] = useState("Dev");
	const [name2, setName2] = useState("Staging");
	const [text1, setText1] = useState(
		'{"ASSURANCE_URL": "http://dk-api-assurance:8080"}'
	);
	const [resultText1, setResultText1] = useState("");
	const [text2, setText2] = useState(
		'{"PRODUCT_URL": "http://dk-api-product:8080"}'
	);
	const [resultText2, setResultText2] = useState("");

	useEffect(() => {
		checkValidJSON();
		compare();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [text1, text2]);

	const onChangeText1 = (e) => {
		const value = e?.target?.value;

		setText1(value);
	};

	const onChangeText2 = (e) => {
		const value = e?.target?.value;

		setText2(value);
	};

	const checkValidJSON = () => {
		if (!isJson(text1)) {
			const message = "Text1 not valid.";
			setResultText1(message);
			setResultText2(message);
		}
		if (!isJson(text2)) {
			const message = "Text2 not valid.";
			setResultText1(message);
			setResultText2(message);
		}
	}

	const isJson = (str) => {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	};

	const compare = () => {
		if (isJson(text1) && isJson(text2)) {
			setResultText1("");
			setResultText2("");
			const arrText1 = JSON.parse(text1);
			const arrText2 = JSON.parse(text2);
			let tempResult1 = [];
			let tempResult2 = [];

			for (let key in arrText2) {
				if (!arrText1[key]) {
					tempResult1.push(key);
				}
			}
			let result1 = {};
			for (let idx in tempResult1) {
				const res = tempResult1[idx];
				result1[res] = "";
			}
			setResultText1(JSON.stringify(result1));

			for (let key in arrText1) {
				if (!arrText2[key]) {
					tempResult2.push(key);
				}
			}
			let result2 = {};
			for (let idx in tempResult2) {
				const res = tempResult2[idx];
				result2[res] = "";
			}
			setResultText2(JSON.stringify(result2));
		}
	};

	return (
		<div className="App">
			<div className="row">
				<div className="col-md-6">
					<label>Env</label>
					<input className="form-control" type="text" name="env1" value={name1} onChange={(e) => setName1(e.target.value)} />
					<br />
					<textarea
						rows={12}
						className="w-100 form-control"
						onChange={onChangeText1}
						value={text1}
					></textarea>
				</div>
				<div className="col-md-6">
					<label>Env</label>
					<input className="form-control" type="text" name="env2" value={name2} onChange={(e) => setName2(e.target.value)} />
					<br />
					<textarea
						rows={12}
						className="w-100 form-control"
						onChange={onChangeText2}
						value={text2}
					></textarea>
				</div>
			</div>
			<div className="row">
				<div className="col-md-6 text-left">
					<label>Result Env {name1}</label>
					<div className="text-break">{resultText1}</div>
				</div>
				<div className="col-md-6 text-left">
					<label>Result Env {name2}</label>
					<div className="text-break">{resultText2}</div>
				</div>
			</div>
		</div>
	);
}

export default App;
