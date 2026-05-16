# 오늘의 한마디

매일 하나씩 읽을 수 있는 한국어 한 줄 문구를 Markdown으로 삽입하는 Obsidian 플러그인입니다.

## 소개

이 플러그인은 로컬 문구 데이터셋에서 무작위 문구를 골라 현재 문서에 삽입합니다. 외부 API를 호출하지 않으므로 오프라인에서도 동작합니다.

## 사용법

명령 팔레트에서 **무작위 오늘의 한마디 삽입** 명령을 실행할 수 있습니다.

템플릿에서는 기존 플레이스홀더를 그대로 사용할 수 있습니다.

```md
{{daily-saying-kr}}
```

## 개발 환경

```bash
npm install
npm run dev
```

개발용 vault 경로는 셸 환경변수로 미리 지정합니다.

```bash
export OBSIDIAN_VAULT_PATH="$HOME/Documents/Obsidian/Main"
```

`npm run dev`는 개발 감시 모드로 실행됩니다.

- 처음 한 번 빌드한 뒤 대기 상태를 유지합니다.
- `src/` 아래 파일이 바뀌면 자동으로 다시 빌드합니다.
- 빌드에 성공할 때마다 지정한 vault의 `.obsidian/plugins/daily-saying-kr/` 아래로 `main.js`, `manifest.json`, `versions.json`을 자동 복사합니다.

```text
Deployed daily-saying-kr to:
  /Users/john/Documents/Obsidian/Main/.obsidian/plugins/daily-saying-kr
[watch] build finished, watching for changes...
```

위 상태는 정상입니다. 파일 변경을 기다리는 중이며, 개발을 마칠 때는 터미널에서 `Ctrl + C`로 종료합니다.

> Obsidian은 빌드 결과가 바뀌어도 플러그인을 자동으로 다시 로드하지 않습니다. 새 코드를 확인하려면 Obsidian을 다시 로드하거나 플러그인을 다시 활성화해야 합니다.

## 배포용 빌드

```bash
npm run build
```

배포용 산출물은 저장소 루트의 `main.js`, `manifest.json`, `versions.json`입니다. Obsidian 커뮤니티 플러그인 릴리스에서는 버전 태그와 동일한 릴리스에 `manifest.json`, `main.js`, 선택적으로 `styles.css`를 첨부해야 합니다.

## 작성자

Rando209

## 라이선스

MIT
