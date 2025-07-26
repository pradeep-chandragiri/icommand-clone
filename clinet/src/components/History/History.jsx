import React, { useState } from 'react'
import './History.css'

function History({handleHistory}) {
    return (
        <>
            <div id="history">
                <div className="historyRes">
                    <p>History</p>
                    <p onClick={handleHistory}>Cancel</p>
                </div>
                <div className="historyList">
                    <div className="historyItem active">
                        <p>Marine Products Community Project</p>
                    </div>
                    <div className="historyItem">
                        <p>ChatGPT vs DeepSeek Comparison</p>
                    </div>
                    <div className="historyItem">
                        <p>Free Llama API Access</p>
                    </div>
                    <div className="historyItem">
                        <p>Optimizing ChatGPT API Costs</p>
                    </div>
                    <div className="historyItem">
                        <p>Time Conversion Summary</p>
                    </div>
                    <div className="historyItem">
                        <p>Google GenAI Integration</p>
                    </div>
                    <div className="historyItem">
                        <p>Codex Mini Model Explained</p>
                    </div>
                    <div className="historyItem">
                        <p>iCommand Tagline Suggestions</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default History