import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputs, setInputs] = useState({
    N1: "",
    D1: "",
    Q1: "",
    H1: "",
    P1: "",
    N2: "",
    D2: ""
  });

  const [results, setResults] = useState({
    Q2: "",
    H2: "",
    P2: ""
  });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const calculate = () => {
    const { N1, D1, Q1, H1, P1, N2, D2 } = inputs;

    const n1 = parseFloat(N1);
    const d1 = parseFloat(D1);
    const q1 = parseFloat(Q1);
    const h1 = parseFloat(H1);
    const p1 = parseFloat(P1);
    const n2 = parseFloat(N2);
    const d2 = parseFloat(D2);

    if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2)) {
      alert("속도와 직경 값을 모두 입력해 주세요.");
      return;
    }

    const ratioN = n2 / n1;
    const ratioD = d2 / d1;

    const Q2 = !isNaN(q1) ? (q1 * ratioN * Math.pow(ratioD, 3)).toFixed(3) : "";
    const H2 = !isNaN(h1) ? (h1 * Math.pow(ratioN, 2) * Math.pow(ratioD, 2)).toFixed(2) : "";
    const P2 = !isNaN(p1) ? (p1 * Math.pow(ratioN, 3) * Math.pow(ratioD, 5)).toFixed(2) : "";

    setResults({ Q2, H2, P2 });
  };

  return (
    <div className="app-container">
      <h1 className="app-title">FAN 성능 계산기</h1>

      <div className="param-grid">
        {/* 좌측 열: 기준값 입력 */}
        <div className="input-column">
          <h3>기준값 입력</h3>
          <div className="input-group">
            <label>속도 N₁ (RPM)</label>
            <input type="number" name="N1" value={inputs.N1} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>직경 D₁ (m)</label>
            <input type="number" name="D1" value={inputs.D1} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>유량 Q₁ (m³/s)</label>
            <input type="number" name="Q1" value={inputs.Q1} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>압력 H₁ (Pa)</label>
            <input type="number" name="H1" value={inputs.H1} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>동력 P₁ (kW)</label>
            <input type="number" name="P1" value={inputs.P1} onChange={handleChange} />
          </div>
        </div>

        {/* 우측 열: 변경값 입력 & 출력 */}
        <div className="input-column">
          <h3>변경값 출력</h3>
          <div className="input-group">
            <label>속도 N₂ (RPM)</label>
            <input type="number" name="N2" value={inputs.N2} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>직경 D₂ (m)</label>
            <input type="number" name="D2" value={inputs.D2} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>유량 Q₂ (m³/s)</label>
            <input type="text" value={results.Q2} readOnly placeholder="자동 계산" />
          </div>
          <div className="input-group">
            <label>압력 H₂ (Pa)</label>
            <input type="text" value={results.H2} readOnly placeholder="자동 계산" />
          </div>
          <div className="input-group">
            <label>동력 P₂ (kW)</label>
            <input type="text" value={results.P2} readOnly placeholder="자동 계산" />
          </div>
        </div>
      </div>

      <button className="calculate-button" onClick={calculate}>
        계산하기
      </button>
    </div>
  );
}

export default App;
