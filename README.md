# projeto11-tweteroo
## Desenvolvimento back end 
------------------------------
Nesse projeto, o front disponibilizado faz requisições **post** e **get** por meio da bibliotéca **axios**, cabendo 
ao back a interpretação dos objetos enviados, bem como a construção da lógica para o retorno/resposta das requisições.

A estrutura de requisições do servidor e fundamentada no framework express, possibilitando, assim, uma fácil e rápida
comunicação entre o front e back end.

------------------------------
### Estruturas dos objetos: 

post para login:

`app.post();`
```
{
  username: "name",
  avatar: "url"
}
```

get para tweets:

`app.get();`
```
{
  username: "name",
  avatar: "url",
  tweet: "text"
}
```
