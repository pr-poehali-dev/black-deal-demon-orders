import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Demon {
  id: number;
  name: string;
  type: string;
  power: number;
  danger: number;
  price: number;
  ability: string;
  weakness: string;
  description: string;
}

const demons: Demon[] = [
  { 
    id: 1, 
    name: 'Демон-Сыра', 
    type: 'Пищевой', 
    power: 2, 
    danger: 1, 
    price: 50000, 
    ability: 'Создаёт вязкие сырные ловушки, способен расплавиться и просочиться через узкие щели', 
    weakness: 'Высокие температуры заставляют его терять форму, боится огня',
    description: 'Мягкий и податливый демон, рождённый из страха перед испорченной едой. Имеет жёлтый оттенок и специфический запах.'
  },
  { 
    id: 2, 
    name: 'Демон-Голубя', 
    type: 'Животный', 
    power: 3, 
    danger: 2, 
    price: 75000, 
    ability: 'Призывает стаю до 50 голубей, отличная разведка с высоты, быстрая передача информации', 
    weakness: 'Громкие звуки и резкие движения дезориентируют стаю',
    description: 'Демон городских птиц с серым оперением. Обладает коллективным разумом, может атаковать большими группами.'
  },
  { 
    id: 3, 
    name: 'Демон-Кошка', 
    type: 'Животный', 
    power: 4, 
    danger: 3, 
    price: 120000, 
    ability: 'Безупречное ночное зрение, абсолютная бесшумность, острые когти и клыки, девять жизней', 
    weakness: 'Паническая боязнь воды, теряет 1/9 силы при каждой "смерти"',
    description: 'Изящный хищник с чёрной шерстью и светящимися глазами. Один из самых популярных демонов для скрытых операций.'
  },
  { 
    id: 4, 
    name: 'Демон-Помидора', 
    type: 'Растительный', 
    power: 2, 
    danger: 2, 
    price: 60000, 
    ability: 'Выстреливает кислотным соком на расстояние до 10 метров, размножается семенами', 
    weakness: 'Холод замедляет все процессы, мороз полностью обездвиживает',
    description: 'Круглый красный демон с зелёными листьями. Оставляет красные следы и обладает раздражающим характером.'
  },
  { 
    id: 5, 
    name: 'Демон-Курицы', 
    type: 'Животный', 
    power: 3, 
    danger: 2, 
    price: 85000, 
    ability: 'Острые когти-шпоры, невероятная скорость бега до 40 км/ч, оглушающий крик', 
    weakness: 'Панически боится огня, легко впадает в ступор от яркого света',
    description: 'Агрессивный демон с белыми перьями и красным гребнем. Несмотря на комичный вид, опасен в ближнем бою.'
  },
  { 
    id: 6, 
    name: 'Демон-Мыла', 
    type: 'Бытовой', 
    power: 1, 
    danger: 1, 
    price: 35000, 
    ability: 'Создаёт скользкие мыльные поверхности, образует пенные барьеры, очищает следы', 
    weakness: 'Грязь и масла нейтрализуют его способности, быстро растворяется в воде',
    description: 'Небольшой бледно-голубой демон с приятным запахом. Идеален для побегов и сокрытия улик.'
  },
  { 
    id: 7, 
    name: 'Демон-Ножниц', 
    type: 'Предметный', 
    power: 5, 
    danger: 4, 
    price: 180000, 
    ability: 'Режет любые материалы включая металл, может разделяться на два лезвия, молниеносные атаки', 
    weakness: 'Ржавчина блокирует движения, сильные удары могут сломать лезвия',
    description: 'Опасный демон из двух серебристых лезвий. Один из сильнейших слабых демонов, требует опыта в обращении.'
  },
  { 
    id: 8, 
    name: 'Демон-Цветка', 
    type: 'Растительный', 
    power: 2, 
    danger: 2, 
    price: 70000, 
    ability: 'Распыляет ядовитую пыльцу с усыпляющим эффектом, привлекает насекомых-союзников', 
    weakness: 'Гербициды смертельны, без солнечного света быстро увядает',
    description: 'Красивый демон с яркими лепестками. Обманчиво привлекателен, но его пыльца может вырубить взрослого человека.'
  },
  { 
    id: 9, 
    name: 'Демон-Часов', 
    type: 'Предметный', 
    power: 4, 
    danger: 3, 
    price: 150000, 
    ability: 'Замедляет время в радиусе 5 метров на 50%, предсказывает события за 3 секунды вперёд', 
    weakness: 'Магнитные поля сбивают внутренний механизм, требует постоянного завода',
    description: 'Механический демон с золотыми стрелками. Тикает с каждым использованием способности, выдавая позицию.'
  },
  { 
    id: 10, 
    name: 'Демон-Карандаша', 
    type: 'Предметный', 
    power: 1, 
    danger: 1, 
    price: 40000, 
    ability: 'Рисует материализующиеся ловушки и простые предметы, оставляет помечающие метки', 
    weakness: 'Ластик полностью стирает его творения и ранит самого демона',
    description: 'Длинный тонкий демон с графитовым наконечником. Полезен для разведки и создания временных препятствий.'
  },
  { 
    id: 11, 
    name: 'Демон-Зеркала', 
    type: 'Предметный', 
    power: 3, 
    danger: 3, 
    price: 95000, 
    ability: 'Создаёт иллюзорные копии охотника, отражает слабые атаки, показывает правду о намерениях', 
    weakness: 'Разбивается от сильных ударов, тьма делает его бесполезным',
    description: 'Отражающий демон в серебристой раме. Копии неотличимы от оригинала, но не могут атаковать.'
  },
  { 
    id: 12, 
    name: 'Демон-Электричества', 
    type: 'Энергетический', 
    power: 4, 
    danger: 4, 
    price: 160000, 
    ability: 'Генерирует разряды до 10000 вольт, отключает электронику, питается от розеток', 
    weakness: 'Резиновая изоляция полностью блокирует, вода проводит и рассеивает силу',
    description: 'Искрящийся демон ярко-синего цвета. Крайне нестабилен, может разрядиться в любой момент.'
  },
  { 
    id: 13, 
    name: 'Демон-Паука', 
    type: 'Животный', 
    power: 3, 
    danger: 3, 
    price: 90000, 
    ability: 'Плетёт сверхпрочную паутину, ядовитый укус вызывает паралич, лазание по любым поверхностям', 
    weakness: 'Огонь мгновенно сжигает паутину, инсектициды смертельны',
    description: 'Восьминогий демон размером с кулак. Отличный охотник в замкнутых пространствах, террorizирует жертв.'
  },
  { 
    id: 14, 
    name: 'Демон-Бумаги', 
    type: 'Предметный', 
    power: 2, 
    danger: 2, 
    price: 55000, 
    ability: 'Режет как бритва краями, может складываться в оригами-конструкции, скользит по ветру', 
    weakness: 'Вода размягчает и уничтожает, огонь превращает в пепел за секунды',
    description: 'Белоснежный демон-лист. Обманчиво хрупкий на вид, но его края острее лезвия.'
  },
  { 
    id: 15, 
    name: 'Демон-Тени', 
    type: 'Эфемерный', 
    power: 3, 
    danger: 2, 
    price: 100000, 
    ability: 'Перемещается через тени, становится невидимым в темноте, душит жертв их собственной тенью', 
    weakness: 'Яркий свет полностью обездвиживает, не может существовать при полном освещении',
    description: 'Бесформенный чёрный силуэт. Идеален для ночных операций, но бесполезен днём.'
  },
  { 
    id: 16, 
    name: 'Демон-Льда', 
    type: 'Стихийный', 
    power: 4, 
    danger: 3, 
    price: 135000, 
    ability: 'Замораживает влагу в радиусе 3 метров, создаёт ледяное оружие, понижает температуру до -30°C', 
    weakness: 'Высокая температура и огонь быстро растапливают, соль разрушает структуру',
    description: 'Кристаллический демон голубого оттенка. Оставляет за собой иней и морозные узоры.'
  },
  { 
    id: 17, 
    name: 'Демон-Гриба', 
    type: 'Растительный', 
    power: 2, 
    danger: 3, 
    price: 65000, 
    ability: 'Выпускает галлюциногенные споры, быстро растёт во влажной среде, разлагает органику', 
    weakness: 'Сухость останавливает рост, ультрафиолет убивает споры',
    description: 'Пятнистый демон с ядовитой шляпкой. Споры вызывают кошмарные видения у жертв.'
  },
  { 
    id: 18, 
    name: 'Демон-Ржавчины', 
    type: 'Коррозийный', 
    power: 3, 
    danger: 2, 
    price: 80000, 
    ability: 'Мгновенно разъедает металл при касании, ослабляет металлические конструкции дистанционно', 
    weakness: 'Не действует на неметаллы, масло замедляет процесс коррозии',
    description: 'Рыжевато-бурый демон с крошащейся поверхностью. Незаменим против бронированных противников.'
  },
  { 
    id: 19, 
    name: 'Демон-Дыма', 
    type: 'Эфемерный', 
    power: 2, 
    danger: 2, 
    price: 70000, 
    ability: 'Создаёт плотную дымовую завесу радиусом 10 метров, удушает жертв, проникает везде', 
    weakness: 'Сильный ветер рассеивает полностью, вода осаждает частицы',
    description: 'Серый клубящийся демон без постоянной формы. Отличная маскировка и средство побега.'
  },
  { 
    id: 20, 
    name: 'Демон-Иглы', 
    type: 'Предметный', 
    power: 3, 
    danger: 3, 
    price: 85000, 
    ability: 'Выстреливает тонкими иглами со скоростью пули, проникает сквозь щели, точечные атаки', 
    weakness: 'Магнит притягивает и обездвиживает, толстая броня полностью защищает',
    description: 'Металлический демон размером с швейную иглу. Болезненный, но не смертельный в большинстве случаев.'
  },
  { 
    id: 21, 
    name: 'Демон-Плесени', 
    type: 'Грибковый', 
    power: 2, 
    danger: 2, 
    price: 50000, 
    ability: 'Быстро распространяется по органическим поверхностям, разрушает древесину и ткань, вызывает аллергию', 
    weakness: 'Сухость и проветривание останавливают рост, отбеливатель смертелен',
    description: 'Зеленовато-чёрный демон, образующий колонии. Отвратителен, но эффективен для диверсий.'
  },
  { 
    id: 22, 
    name: 'Демон-Звука', 
    type: 'Энергетический', 
    power: 4, 
    danger: 3, 
    price: 140000, 
    ability: 'Генерирует оглушающие звуковые волны до 120 дБ, разбивает стекло, дезориентирует противников', 
    weakness: 'Вакуум и плотная изоляция блокируют полностью, беруши снижают эффект',
    description: 'Вибрирующий демон с пульсирующими волнами. Может вызвать кровотечение из ушей при максимальной мощности.'
  },
  { 
    id: 23, 
    name: 'Демон-Стекла', 
    type: 'Предметный', 
    power: 3, 
    danger: 4, 
    price: 110000, 
    ability: 'Создаёт невидимые стеклянные барьеры, осколки режут как бритвы, преломляет свет для маскировки', 
    weakness: 'Сильные удары разбивают на осколки, теряющие силу, пыль делает видимым',
    description: 'Прозрачный острогранный демон. Крайне опасен — жертвы не видят атак до последнего момента.'
  },
  { 
    id: 24, 
    name: 'Демон-Пыли', 
    type: 'Эфемерный', 
    power: 1, 
    danger: 1, 
    price: 30000, 
    ability: 'Вызывает приступы чихания и аллергии, замутняет обзор, проникает в механизмы', 
    weakness: 'Вода прибивает к земле, воздушные фильтры полностью блокируют',
    description: 'Мельчайший серый демон-рой. Больше раздражает, чем наносит вред, но полезен для отвлечения.'
  },
  { 
    id: 25, 
    name: 'Демон-Верёвки', 
    type: 'Предметный', 
    power: 3, 
    danger: 2, 
    price: 75000, 
    ability: 'Связывает и душит жертв, может удлиняться до 50 метров, образует узлы любой сложности', 
    weakness: 'Острые лезвия легко перерезают, огонь прожигает мгновенно',
    description: 'Длинный пеньковый демон коричневого цвета. Отличный инструмент для пленения и контроля.'
  },
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [powerRange, setPowerRange] = useState([1, 5]);
  const [dangerRange, setDangerRange] = useState([1, 4]);
  const [typeFilter, setTypeFilter] = useState('all');
  const [activeSection, setActiveSection] = useState('catalog');

  const filteredDemons = demons.filter(demon => {
    const matchesSearch = demon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPower = demon.power >= powerRange[0] && demon.power <= powerRange[1];
    const matchesDanger = demon.danger >= dangerRange[0] && demon.danger <= dangerRange[1];
    const matchesType = typeFilter === 'all' || demon.type === typeFilter;
    return matchesSearch && matchesPower && matchesDanger && matchesType;
  });

  const getPowerColor = (power: number) => {
    if (power <= 2) return 'bg-green-900/50 text-green-400 border-green-800';
    if (power <= 4) return 'bg-yellow-900/50 text-yellow-400 border-yellow-800';
    return 'bg-red-900/50 text-red-400 border-red-800';
  };

  const getDangerColor = (danger: number) => {
    if (danger <= 2) return 'bg-blue-900/50 text-blue-400 border-blue-800';
    if (danger <= 3) return 'bg-orange-900/50 text-orange-400 border-orange-800';
    return 'bg-red-900/50 text-red-400 border-red-800';
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Icon name="Skull" size={24} className="text-white" />
              </div>
              <h1 className="text-3xl font-black tracking-tight text-foreground">
                ЧЁРНАЯ СДЕЛКА
              </h1>
            </div>
            <nav className="flex gap-6">
              {['catalog', 'about', 'contracts', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`text-sm font-medium transition-colors hover:text-accent ${
                    activeSection === section ? 'text-accent' : 'text-muted-foreground'
                  }`}
                >
                  {section === 'catalog' && 'Каталог'}
                  {section === 'about' && 'О демонах'}
                  {section === 'contracts' && 'Контракты'}
                  {section === 'contact' && 'Контакты'}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {activeSection === 'catalog' && (
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8 space-y-6">
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Поиск демона..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-secondary border-border"
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[200px] bg-secondary border-border">
                    <SelectValue placeholder="Тип демона" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все типы</SelectItem>
                    <SelectItem value="Пищевой">Пищевой</SelectItem>
                    <SelectItem value="Животный">Животный</SelectItem>
                    <SelectItem value="Растительный">Растительный</SelectItem>
                    <SelectItem value="Бытовой">Бытовой</SelectItem>
                    <SelectItem value="Предметный">Предметный</SelectItem>
                    <SelectItem value="Энергетический">Энергетический</SelectItem>
                    <SelectItem value="Эфемерный">Эфемерный</SelectItem>
                    <SelectItem value="Стихийный">Стихийный</SelectItem>
                    <SelectItem value="Грибковый">Грибковый</SelectItem>
                    <SelectItem value="Коррозийный">Коррозийный</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 p-6 bg-card rounded-lg border border-border">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Icon name="Zap" size={16} className="text-accent" />
                    Уровень силы: {powerRange[0]} - {powerRange[1]}
                  </label>
                  <Slider
                    min={1}
                    max={5}
                    step={1}
                    value={powerRange}
                    onValueChange={setPowerRange}
                    className="cursor-pointer"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Icon name="AlertTriangle" size={16} className="text-accent" />
                    Уровень опасности: {dangerRange[0]} - {dangerRange[1]}
                  </label>
                  <Slider
                    min={1}
                    max={4}
                    step={1}
                    value={dangerRange}
                    onValueChange={setDangerRange}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDemons.map((demon) => (
              <Card key={demon.id} className="bg-card border-border hover:border-accent transition-all duration-300 hover-scale overflow-hidden group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                        {demon.name}
                      </CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {demon.type}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Badge className={`${getPowerColor(demon.power)} border flex items-center gap-1`}>
                      <Icon name="Zap" size={12} />
                      Сила: {demon.power}/5
                    </Badge>
                    <Badge className={`${getDangerColor(demon.danger)} border flex items-center gap-1`}>
                      <Icon name="AlertTriangle" size={12} />
                      Опасность: {demon.danger}/4
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Icon name="Sparkles" size={14} className="text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{demon.ability}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="ShieldAlert" size={14} className="text-destructive mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{demon.weakness}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <div className="text-2xl font-black text-accent">
                      ¥{demon.price.toLocaleString()}
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="bg-primary hover:bg-accent transition-colors">
                          Заключить контракт
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-card border-border">
                        <DialogHeader>
                          <DialogTitle className="text-2xl">{demon.name}</DialogTitle>
                          <DialogDescription className="text-muted-foreground">
                            Детали контракта с демоном
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="bg-secondary/30 p-4 rounded-lg border border-border mb-4">
                            <p className="text-sm text-muted-foreground leading-relaxed">{demon.description}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <div className="text-sm text-muted-foreground">Тип</div>
                              <div className="font-medium">{demon.type}</div>
                            </div>
                            <div className="space-y-1">
                              <div className="text-sm text-muted-foreground">Стоимость</div>
                              <div className="font-bold text-accent">¥{demon.price.toLocaleString()}</div>
                            </div>
                            <div className="space-y-1">
                              <div className="text-sm text-muted-foreground">Сила</div>
                              <Badge className={getPowerColor(demon.power)}>{demon.power}/5</Badge>
                            </div>
                            <div className="space-y-1">
                              <div className="text-sm text-muted-foreground">Опасность</div>
                              <Badge className={getDangerColor(demon.danger)}>{demon.danger}/4</Badge>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="font-medium flex items-center gap-2">
                              <Icon name="Sparkles" size={16} className="text-accent" />
                              Способность:
                            </div>
                            <div className="text-sm text-muted-foreground leading-relaxed pl-6">{demon.ability}</div>
                          </div>
                          <div className="space-y-2">
                            <div className="font-medium flex items-center gap-2">
                              <Icon name="ShieldAlert" size={16} className="text-destructive" />
                              Слабость:
                            </div>
                            <div className="text-sm text-muted-foreground leading-relaxed pl-6">{demon.weakness}</div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDemons.length === 0 && (
            <div className="text-center py-20">
              <Icon name="SearchX" size={64} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground">Демоны не найдены</p>
              <p className="text-sm text-muted-foreground mt-2">Попробуйте изменить фильтры</p>
            </div>
          )}
        </main>
      )}

      {activeSection === 'about' && (
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-black text-center mb-12">О демонах</h2>
            
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="BookOpen" size={24} className="text-accent" />
                  Что такое демоны?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Демоны в нашем мире — это сверхъестественные существа, рождённые из человеческих страхов.
                  Чем сильнее страх перед объектом или концепцией, тем могущественнее демон.
                </p>
                <p>
                  Слабые демоны, представленные в нашем каталоге, происходят из незначительных или специфических страхов.
                  Они идеально подходят для начинающих охотников на демонов.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="Target" size={24} className="text-accent" />
                  Классификация по силе
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge className={getPowerColor(1)}>1-2</Badge>
                  <span className="text-muted-foreground">Минимальная угроза - подходит новичкам</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getPowerColor(3)}>3-4</Badge>
                  <span className="text-muted-foreground">Средняя угроза - требуется опыт</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getPowerColor(5)}>5</Badge>
                  <span className="text-muted-foreground">Высокая угроза - только для профи</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="AlertCircle" size={24} className="text-accent" />
                  Уровни опасности
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge className={getDangerColor(1)}>1</Badge>
                  <span className="text-muted-foreground">Безопасный - минимальный риск травм</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getDangerColor(2)}>2</Badge>
                  <span className="text-muted-foreground">Осторожность - возможны лёгкие травмы</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getDangerColor(3)}>3</Badge>
                  <span className="text-muted-foreground">Опасный - риск серьёзных травм</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getDangerColor(4)}>4</Badge>
                  <span className="text-muted-foreground">Смертельный - высокий риск летального исхода</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      )}

      {activeSection === 'contracts' && (
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-black text-center mb-12">Контракты и договоры</h2>
            
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="FileText" size={24} className="text-accent" />
                  Как работают контракты
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Контракт с демоном — это взаимное соглашение между охотником и демоном.
                  Вы получаете часть силы демона в обмен на определённую плату.
                </p>
                <div className="bg-secondary/50 p-4 rounded-lg border border-border">
                  <div className="font-semibold text-foreground mb-2">Стандартные условия:</div>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Оплата производится в йенах (¥)</li>
                    <li>Контракт действует до выполнения задачи</li>
                    <li>Демон должен подчиняться вашим командам</li>
                    <li>В случае гибели демона — возврат средств не производится</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border border-accent">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="ShieldAlert" size={24} className="text-accent" />
                  Важные предупреждения
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <div className="flex items-start gap-2">
                  <Icon name="AlertTriangle" size={16} className="text-destructive mt-1 flex-shrink-0" />
                  <span>Не пытайтесь обмануть демона — контракт магически обязывающий</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="AlertTriangle" size={16} className="text-destructive mt-1 flex-shrink-0" />
                  <span>Использование силы демона требует ментальной стойкости</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="AlertTriangle" size={16} className="text-destructive mt-1 flex-shrink-0" />
                  <span>Слабость демона может стать вашей слабостью</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="CreditCard" size={24} className="text-accent" />
                  Процесс оформления
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    1
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Выбор демона</div>
                    <div className="text-sm">Изучите каталог и выберите подходящего демона</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    2
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Оплата</div>
                    <div className="text-sm">Переведите указанную сумму в йенах</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    3
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Оплата</div>
                    <div className="text-sm">Переведите указанную сумму в йенах</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    3
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Ритуал призыва</div>
                    <div className="text-sm">Проведите церемонию призыва демона</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    4
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Активация контракта</div>
                    <div className="text-sm">Подпишите магический контракт кровью</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      )}

      {activeSection === 'contact' && (
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-black text-center mb-12">Контакты для связи</h2>
            
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="Mail" size={24} className="text-accent" />
                  Свяжитесь с нами
                </CardTitle>
                <CardDescription>
                  Мы работаем круглосуточно для вашего удобства
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg">
                    <Icon name="Phone" size={20} className="text-accent" />
                    <div>
                      <div className="text-sm text-muted-foreground">Телефон</div>
                      <div className="font-medium">+81 3-1234-5678</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg">
                    <Icon name="Mail" size={20} className="text-accent" />
                    <div>
                      <div className="text-sm text-muted-foreground">Email</div>
                      <div className="font-medium">contracts@black-deal.jp</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg">
                    <Icon name="MapPin" size={20} className="text-accent" />
                    <div>
                      <div className="text-sm text-muted-foreground">Офис</div>
                      <div className="font-medium">Токио, Сибуя, ул. Охотников, 13</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg">
                    <Icon name="Clock" size={20} className="text-accent" />
                    <div>
                      <div className="text-sm text-muted-foreground">Часы работы</div>
                      <div className="font-medium">24/7 - Демоны не спят</div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <div className="bg-destructive/10 border border-destructive/50 rounded-lg p-4">
                    <div className="flex gap-3">
                      <Icon name="AlertCircle" size={20} className="text-destructive flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground block mb-1">Экстренная помощь</span>
                        Если контракт вышел из-под контроля, немедленно звоните на горячую линию: +81 3-9999-6666
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      )}

      <footer className="border-t border-border mt-20 bg-card/50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground text-sm">
            <p className="mb-2">© 2026 Чёрная Сделка. Все контракты юридически и магически обязывающие.</p>
            <p className="text-xs">Помните: каждый контракт требует жертв. Действуйте осторожно.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;