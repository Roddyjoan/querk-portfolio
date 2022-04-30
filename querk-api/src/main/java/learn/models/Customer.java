package learn.models;

public class Customer {
    private int customerId;
    private int userId;
    private String name;
    private String phoneNum;
    private String email;

    public Customer(int customerId, int userId, String name, String phoneNum, String email) {
        this.customerId = customerId;
        this.userId = userId;
        this.name = name;
        this.phoneNum = phoneNum;
        this.email = email;
    };

    public Customer() {
    };


    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNum() {
        return phoneNum;
    }

    public void setPhoneNum(String phoneNum) {
        this.phoneNum = phoneNum;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
