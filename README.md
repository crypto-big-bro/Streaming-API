## Streaming API on PHP


Для старта отредактируйте файл **example/scripts/VKAPI.php**

```
public function __construct() {
  $this->accessToken = /** ВАШ ТОКЕН ПРИЛОЖЕНИЯ **/;
  $this->url = "https://api.vk.com/method/";
}
```

Пример доступен по ссылке - [cebattle.com/vk-competition](https://cebattle.com/vk-competition)

## Create & delete rules

```php
$vk = new VKAPI();
$vk->addRules($rules); //создание правила
$vk->delRules($rules); //удаление правила
```

**$rules** - массив, содержащий при создании правила, название и тег, пример:

```php
$rules = [
  "rule" => [
     "value" => "Правило #1",
     "tag" => 1
   ]
];

//для удаления правила необходимо указать только тег
$rules = [
   "tag" => 1
];
```

## License & Author

MIT. [Артем Молодцов](https://vk.com/amandi.star).