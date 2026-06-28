import './App.css'
// import {TerminalWindow} from "./compos/TerminalWindow.tsx";
import "./index.css"

function App() {


  return (
      <>
          <body className="">
          <div className="terminal power-on">
              <div className="terminal__titlebar">
                  <div className="terminal__lights">
                      <span className="terminal__light terminal__light--close"></span>
                      <span className="terminal__light terminal__light--min"></span>
                      <span className="terminal__light terminal__light--zoom"></span>
                  </div>
                  CRT Terminal • TTY0
              </div>

              <div className="terminal__screen crt-text">
                  <div className="matrix"></div>

                  <p className="prompt">ברוך הבא לטרמינל הישן שלי<span className="caret"></span></p>
                  <p className="prompt type-on">echo "Hello from the past!"</p>
                  <div className="hr"></div>

                  <div className="row">
                      <button className="btn">Run</button>
                      <button className="btn">Build</button>
                      <span className="badge badge--ok">OK</span>
                      <span className="badge badge--warn">WARN</span>
                      <span className="badge badge--err">ERR</span>
                  </div>

                  <div className="stack-lg pad">
                      <input className="input" placeholder="type your command..."/>
                      <textarea className="textarea" rows={4} placeholder="multi-line input"></textarea>
                  </div>

                  <table className="table pad">
                      <thead>
                      <tr>
                          <th>קובץ</th>
                          <th>מצב</th>
                          <th>גודל</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                          <td>/etc/passwd</td>
                          <td>ro</td>
                          <td>2.4KB</td>
                      </tr>
                      <tr>
                          <td>/usr/bin/fortune</td>
                          <td>rwx</td>
                          <td>34KB</td>
                      </tr>
                      </tbody>
                  </table>

                  <p className="prompt crt-dim">cat README.md<span className="caret"></span></p>
              </div>

              <div className="crt-overlay"></div>
          </div>
          </body>

          {/*<TerminalWindow/>*/}
      </>
  )
}

export default App
