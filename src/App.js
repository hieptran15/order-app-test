import React, { useState } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import DbDishes from './Db.json'
import { Tabs, Form, Button, Space ,Modal} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;
function App() {

  const [data, setData] = useState({
    meal:'',
    numberPeople:1,
    restaurant:'',
    dishs:[],
  });
  const [todish, setToDish] = useState({
      dish:'',
      servingSize:1
  });
  const[model,setModel]=useState({
    visible: false
  })

  const onchangeData=(e)=>{
    setData({...data,[e.target.name]: e.target.value})
  }


  const onChangedishs = (e) => {
   setToDish({...todish,[e.target.name]: e.target.value})
  }



  const dishdata=()=>{
    data.dishs.push(todish)
  }
//model.......................
 const showModal = () => {
   if(data.meal && data.numberPeople && data.restaurant){
        setModel({
             visible: true,
          });
   }else{
     alert('please enter enough step!')
   }
   
  };

 const handleCancel = e => {
    setModel({
      visible: false,
    });
    setData({
          dishs:[]
        })
  };
  return (
    <>
    <div className='container'>
      <div className="text-center">
        <h1>Trần Văn Hiệp</h1>
        <h2>Bài test online</h2>
      </div>
          <div className="editReview">
            <Button type="primary" onClick={showModal}>
            finish
            </Button>
            <Modal
              visible={model.visible}
              footer=''
            >
              <div class="alert alert-success " role="alert">
                  <p className="text-center">order seccess...!</p>
              </div>
            <b>Meal</b>: {data.meal}
            <br />
            <b>no of number</b>:        {data.numberPeople}
            <br />
            <b>restaurant</b>:{data.restaurant}
            <br/>
            <b>Dishes:</b>
                  <ul>
                    {(data.dishs !== null)?data.dishs.map((value,key)=>{
                      return(
                      <li>{value.dish}--- and--- <span>serving</span>:{value.servingSize}</li>
                      )
                    }):alert('lỗi')}
                  </ul>
                  <div class="alert alert-warning" role="alert">
                   Thank you very much!
                   Please choose to continue.. :)
                  </div>
                <button onClick={()=>handleCancel()} className="btn btn-primary">ok</button>
            </Modal>
          </div>
      <div className="big">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Step 1" key="1">
            <div className="editStep1 mt-5">
              <h4>please select a meal</h4>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Meals</label>
                  </div>
                  <select onChange={(e) => onchangeData(e)} name='meal' class="custom-select" id="inputGroupSelect01">
                    <option selected value="">...</option>
                    <option  value="breakfast">breakfast</option>
                    <option value="lunch">lunch</option>
                    <option value="dinner">dinner</option>
                  </select>
                </div>
            </div>
            <div className="numpeo">
              <p>please enter number of people</p>
              <input type="number" value={data.numberPeople} min={1} max={10}
                name="numberPeople"
                onChange={(e) => onchangeData(e)}
              />
            </div>
          </TabPane>
          {/* end step1.......................... */}

          <TabPane tab="Step 2" key="2">
            <div className="editStep2">
              <h4>please select a restaurant</h4>
              <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSelect01">Options</label>
            </div>
            <select onChange={(e) => onchangeData(e)} name='restaurant' class="custom-select" id="inputGroupSelect01">
              <option selected>...</option>
              <option value="Taco Bell">Taco Bell</option>
              <option value="BBQ Hut">BBQ Hut</option>
              <option value="Vege Deli">Vege Deli</option>
              <option value="Pizzeria">Pizzeria</option>
              <option value="panda">panda</option>
              <option >.......</option>
            </select>
          </div>
            </div>
          </TabPane>
          {/* end step2.......................... */}
          <TabPane tab="Step 3" key="3">
            <div className="editStep3 mt-5">
              <div className="row">
                <div className="col-6">
                  <b>please select a dish</b>
                  <select onChange={(e) => onChangedishs(e)} name='dish' class="custom-select" id="inputGroupSelect01">
                    <option selected>Choose...</option>
                    {DbDishes.map((vlu)=>{
                      return(
                      <option value={vlu.name}>{vlu.name}</option>
                      )
                    })}
                    
                    {/* <option value="tow">Two</option>
                    <option value="three">Three</option> */}
                  </select>
                    </div>
                <div className="col-4">
                  <b>please enter no of serving</b>
                  <input type="number" min={1} max={10} defaultValue={todish.servingSize} name="servingSize" onChange={(e) => onChangedishs(e)} />
                </div>
                <div className="col-2">
                  <button className="mt-3 btn btn-success" onClick={()=>dishdata()}>add</button>
                </div>
              </div>
              <br />
              <Form name="dynamic_form_nest_item" autoComplete="off">
                <Form.List name="users">
                  {(fields, { add, remove }) => {
                    return (
                      <div>
                        {fields.map(field => (
                          <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                            <Form.Item>
                              <b>please select a dish</b>
                              <select onChange={(e) => onChangedishs(e)} name='dish' class="custom-select" id="inputGroupSelect01">
                                <option selected>Choose...</option>
                                {DbDishes.map((vlu)=>{
                                  return(
                                  <option value={vlu.name}>{vlu.name}</option>
                                  )
                                })}
                              </select>
                            </Form.Item>
                            <Form.Item>
                              <b>please enter no of serving</b>
                              <input type="number" min={1} max={10} defaultValue={data.servingSize} name="servingSize" onChange={(e) => onChangedishs(e)} />
                            </Form.Item>
                            <Form.Item>
                            <button className="mt-3 btn btn-success" onClick={()=>dishdata()}>add</button>
                            </Form.Item>

                            <MinusCircleOutlined onClick={() => { remove(field.name) }} />
                          </Space>
                        ))}

                        <Form.Item>
                          <Button className="editAdd mt-3" type="dashed" onClick={() => { add() }} block>
                            <PlusOutlined />
                          </Button>
                        </Form.Item>
                      </div>
                    );
                  }}
                </Form.List>
              </Form>
            </div>
          </TabPane>
          {/* end step3.......................... */}
        </Tabs>
        
      </div>
        
    </div>
    </>
  );
}

export default App;
