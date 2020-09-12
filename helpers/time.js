class Time{
    static gapTime(hour,toHour){
        let jam = parseInt(hour.split('.')[0])
        let menit = parseInt(hour.split('.')[1])
        let totalMenit = jam * 60 + menit
      
        let jam2 = parseInt(toHour.split('.')[0])
        let menit2 = parseInt(toHour.split('.')[1])
        let totalMenit2 = jam2 * 60 + menit2
      
        return totalMenit2 - totalMenit
    }

    static convertTime(time){
        let hour = Math.floor(time/60)
        let minute = time%60
        if (time<60) {
          return formatMinute(minute)
        }else{
          if (minute>1) {
              return `${formatHour(hour)} ${formatMinute(minute)}`
          }else{
              return formatHour(hour)
          }
        }
        
        function formatMinute(minute) {
            if (minute==1) {
                return `${minute} minute`   
            }else{
                return `${minute} minutes`   
            }
          }
        
        function formatHour(hour) {
            if (hour==1) {
                return `${hour} hour`   
            }else{
                return `${hour} hours`   
            }
          }
    }

    static todayDate() {
        const monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        return `${new Date(Date.now()).getDate()} ${monthNames[new Date(Date.now()).getMonth()]} ${new Date(Date.now()).getUTCFullYear()}`
    }

    static formatTime(time){
        return Number(time) < 10 ? `0${+time}` : +time
    }

}

module.exports = Time