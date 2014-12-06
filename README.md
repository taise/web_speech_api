Web Speech API
=====================================

This is show text that recognised speak using Web Speech API.  
Now you can use only Chrome.


## Web Speech API

### 5.1.1 SpeechRecognition Attributes

* grammars attribute
    *  grammars属性は、この認識処理でアクティブな文法のうち
      代表的なSpeechGrammarオブジェクトのコレクションを格納する。
* lang attribute
    * この属性は、妥当なBCP47言語タグを使って、リクエストの認識言語を設定する。  
      もしこの属性を解除すると、スクリプト内で取得しても未設定のままだが、
      htmlドキュメントルート要素と関連する階層のlangをデフォルトで使用する。  
      デフォルトの値は、認識サービスへの入力リクエストの接続が開いたときに処理され使われる。
* continuous attribute
    * When the continuous attribute is set to false, the user agent must return no more than one final result in response to starting recognition, for example a single turn pattern of interaction. When the continuous attribute is set to true, the user agent must return zero or more final results representing multiple consecutive recognitions in response to starting recognition, for example a dictation. The default value must be false. Note, this attribute setting does not affect interim results.
* interimResults attribute
    * Controls whether interim results are returned. When set to true, interim results should be returned. When set to false, interim results must NOT be returned. The default value must be false. Note, this attribute setting does not affect final results.
* maxAlternatives attribute
    * This attribute will set the maximum number of SpeechRecognitionAlternatives per result. The default value is 1.
* serviceURI attribute
    * The serviceURI attribute specifies the location of the speech recognition service that the web application wishes to use. If this attribute is unset at the time of the start method call, then the user agent must use the user agent default speech service. Note that the serviceURI is a generic URI and can thus point to local services either through use of a URN with meaning to the user agent or by specifying a URL that the user agent recognizes as a local service. Additionally, the user agent default can be local or remote and can incorporate end user choices via interfaces provided by the user agent such as browser configuration parameters. [Editor note: The group is currently discussing whether WebRTC might be used to specify selection of audio sources and remote recognizers.] [5]


### 5.1.3 SpeechRecognition Events

* audiostart event
    * ユーザ・エージェントが音声をキャプチャした時に発生する。  
* soundstart event
    * 話すことができると検出されたときに発生する。  
      これは、クライアント側で検出器等を使い、低遅延で発生するべきである。  
* speechstart event
    * 音声認識で使用される音声が開始したときに発生する。  
* speechend event
    * 音声認識で使用される音声が終了したときに発生する。  
      speechstartイベントは、speechendイベントの前に常に発生していなければならない。  
* soundend event
    * 音声が検出されなくなったときに発生する。  
      これは、クライアント側で検出器等を使い、低遅延で発生するべきである。  
* audioend event
    * ユーザ・エージェントが音声のキャプチャを終了した時に発生する。  
      audiostartイベントは、audioendイベントの前に常に発生していなければならない。  
* result event
    * 音声認識が結果を返すときに発生する。  
      このイベントは、SpeechRecognitionEventインターフェースを使わなければならない。  
* nomatch event
    * 信頼閾値を満たす/超える認識候補がない状態で、音声認識が最後の結果を返すときに発生する。  
      このイベントは、SpeechRecognitionEventインターフェースを使わなければならない。  
      イベントの結果の属性に、信頼閾値を下回ったもの、またはnullの音声認識結果を含むことができる。  
* error event
    * 音声認識エラーが発生したときに発生する
      イベントは、SpeechRecognitionErrorインターフェースを使わなければならない。  
* start event
    * 認識サービスが、音声を認識を開始したときに発生する。  
* end event
    * サービスが、切断されたときに発生する。  
      イベントは、セッション終了の理由に関わら、常に生成されなければならない。  



### 音声合成サンプル

```javascript
var u = new SpeechSynthesisUtterance('歌うたいが歌うたいに来て　歌うたえと言うが　歌うたいが歌うたうだけうたい切れば　歌うたうけれども　歌うたいだけ　歌うたい切れないから　歌うたわぬ');
u.lang = 'ja';
speechSynthesis.speak(u);
```

