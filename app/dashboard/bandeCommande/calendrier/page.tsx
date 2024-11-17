"use client"
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { getBandesCommandes } from '../../api/bandeCommande';

const Calendar = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        //dispatch(setPageTitle('Calendar'));
    });
    const now = new Date();
    const getMonth = (dt: Date, add: number = 0) => {
        let month = dt.getMonth() + 1 + add;
        const str = (month < 10 ? '0' + month : month).toString();
        return str;
        // return dt.getMonth() < 10 ? '0' + month : month;
    };

    const [events, setEvents] = useState<any>([
       
    ]);

    const [isAddEventModal, setIsAddEventModal] = useState(false);
    const [minStartDate, setMinStartDate] = useState<any>('');
    const [minEndDate, setMinEndDate] = useState<any>('');
    const defaultParams = {
        id: null,
        title: '',
        start: '',
        end: '',
        description: '',
        type: 'primary',
    };
    useEffect(() => {
        getAllBandesCommandes()
    }, []);
    const getAllBandesCommandes =()=>{
        getBandesCommandes()
        .then(res=>{
         console.log(res)
         if(res){
          let ev :any[] = []
          if(localStorage.getItem("role")==="ADMIN" || localStorage.getItem("role")==="RESPONSABLE_PRODUCTION"){
          res.map((r:any)=>{
            ev.push( {
                id: r.id,
                title: r.designation,
                start: r.startDate,
                end: r.endDate,
                className: r.bandeCommandeStatus==='NEW' ? 'primary' : r.bandeCommandeStatus==='PROCESS' ? 'danger' : r.bandeCommandeStatus==='TERMINETED' ? 'success' :"" ,
            },)
          })
        }
        if(localStorage.getItem("role")==="CHEF_EQUIPE"){
            res.map((r:any)=>{
                if(r.personnelId===parseInt(localStorage.getItem("id")?.toString()||"")){
                ev.push( {
                    id: r.id,
                    title: r.designation,
                    start: r.startDate,
                    end: r.endDate,
                    className: r.bandeCommandeStatus==='NEW' ? 'primary' : r.bandeCommandeStatus==='PROCESS' ? 'danger' : r.bandeCommandeStatus==='TERMINETED' ? 'success' :"" ,
                },)
            }
              })
        }
          setEvents(ev)
         }
        })
        .catch(error=>{
 
        }) 
    }
    const [params, setParams] = useState<any>(defaultParams);
    const dateFormat = (dt: any) => {
        dt = new Date(dt);
        const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
        const date = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
        const hours = dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours();
        const mins = dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes();
        dt = dt.getFullYear() + '-' + month + '-' + date + 'T' + hours + ':' + mins;
        return dt;
    };
    const editEvent = (data: any = null) => {
        let params = JSON.parse(JSON.stringify(defaultParams));
        setParams(params);
        if (data) {
            let obj = JSON.parse(JSON.stringify(data.event));
            setParams({
                id: obj.id ? obj.id : null,
                title: obj.title ? obj.title : null,
                start: dateFormat(obj.start),
                end: dateFormat(obj.end),
                type: obj.classNames ? obj.classNames[0] : 'primary',
                description: obj.extendedProps ? obj.extendedProps.description : '',
            });
            setMinStartDate(new Date());
            setMinEndDate(dateFormat(obj.start));
        } else {
            setMinStartDate(new Date());
            setMinEndDate(new Date());
        }
        setIsAddEventModal(true);
    };
    const editDate = (data: any) => {
        let obj = {
            event: {
                start: data.start,
                end: data.end,
            },
        };
        editEvent(obj);
    };

    const saveEvent = () => {
        if (!params.title) {
            return true;
        }
        if (!params.start) {
            return true;
        }
        if (!params.end) {
            return true;
        }
        if (params.id) {
            //update event
            let dataevent = events || [];
            let event: any = dataevent.find((d: any) => d.id === parseInt(params.id));
            event.title = params.title;
            event.start = params.start;
            event.end = params.end;
            event.description = params.description;
            event.className = params.type;

            setEvents([]);
            setTimeout(() => {
                setEvents(dataevent);
            });
        } else {
            //add event
            let maxEventId = 0;
            if (events) {
                maxEventId = events.reduce((max: number, character: any) => (character.id > max ? character.id : max), events[0].id);
            }
            maxEventId = maxEventId + 1;
            let event = {
                id: maxEventId,
                title: params.title,
                start: params.start,
                end: params.end,
                description: params.description,
                className: params.type,
            };
            let dataevent = events || [];
            dataevent = dataevent.concat([event]);
            setTimeout(() => {
                setEvents(dataevent);
            });
        }
        showMessage('Event has been saved successfully.');
        setIsAddEventModal(false);
    };
    const startDateChange = (event: any) => {
        const dateStr = event.target.value;
        if (dateStr) {
            setMinEndDate(dateFormat(dateStr));
            setParams({ ...params, start: dateStr, end: '' });
        }
    };
    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };
    const showMessage = (msg = '', type = 'success') => {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };

    return (
        <div>
            <div className="panel mb-5">
                <div className="mb-4 flex flex-col items-center justify-center sm:flex-row sm:justify-between">
                    <div className="mb-4 sm:mb-0">
                        <div className="text-center text-lg font-semibold ltr:sm:text-left rtl:sm:text-right">Calendrier</div>
                        <div className="mt-2 flex flex-wrap items-center justify-center sm:justify-start">
                            <div className="flex items-center ltr:mr-4 rtl:ml-4">
                                <div className="h-2.5 w-2.5 rounded-sm bg-primary ltr:mr-2 rtl:ml-2"></div>
                                <div>Nouveau</div>
                            </div>
                           
                            <div className="flex items-center ltr:mr-4 rtl:ml-4">
                                <div className="h-2.5 w-2.5 rounded-sm bg-success ltr:mr-2 rtl:ml-2"></div>
                                <div>Terminer</div>
                            </div>
                            <div className="flex items-center">
                                <div className="h-2.5 w-2.5 rounded-sm bg-danger ltr:mr-2 rtl:ml-2"></div>
                                <div>En cours</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="calendar-wrapper">
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay',
                        }}
                        buttonText={{
                            today: "Aujourd'hui", // Traduction du bouton "Today"
                            month: "Mois",        // Traduction du bouton "Month"
                            week: "Semaine",      // Traduction du bouton "Week"
                            day: "Jour"           // Traduction du bouton "Day"
                        }}
                    
                        locale={"fr"}
                        editable={true}
                        dayMaxEvents={true}
                        selectable={true}
                        droppable={true}
                        events={events}
                    />
                </div>
            </div>

      
        </div>
    );
};

export default Calendar;
